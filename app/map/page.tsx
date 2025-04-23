import Map from '@/components/Map';

// Mock data – replace this with DB fetch
const products = [
  {
    id: '1',
    name: 'Nike Air Force 1',
    coordinates: { lat: 6.5244, lng: 3.3792 }, // Lagos
  },
  {
    id: '2',
    name: 'Samsung TV',
    coordinates: { lat: 6.4531, lng: 3.3958 }, // Ikeja
  },
];

export default function MapPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Live Product Map</h1>
      <Map products={products} />
    </div>
  );
}
