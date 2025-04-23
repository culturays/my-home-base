'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', stock: '', lat: '', lng: '' });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => {
      const p = res.data;
      setForm({
        name: p.name,
        price: p.price,
        stock: p.stock,
        lat: p.coordinates.lat,
        lng: p.coordinates.lng,
      });
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      coordinates: { lat: parseFloat(form.lat), lng: parseFloat(form.lng) },
    };
    await axios.put(`/api/products/${id}`, data);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="name" value={form.name} onChange={handleChange} className="input" />
      <input name="price" value={form.price} onChange={handleChange} className="input" />
      <input name="stock" value={form.stock} onChange={handleChange} className="input" />
      <input name="lat" value={form.lat} onChange={handleChange} className="input" />
      <input name="lng" value={form.lng} onChange={handleChange} className="input" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
