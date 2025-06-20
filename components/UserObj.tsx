"use client"
import { ErrandProps, ProfileProps } from "@/app/types" 
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
 
const UserObj = ({user, listings}:{user:ProfileProps, listings:ErrandProps[]}) => {
   const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    location: '',
    avatar_url: '',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [updating, setUpdating] = useState(false)
  const [showModal, setShowModal] = useState(false)

   // if (profile) setUser({ ...profile, email: user.email })
     if (user) {
          // setUser({ ...profile, email: user.email, id: user.id })
          setFormData(user)
        }
  // if (loading) return <div className="text-center py-20 text-teal-500">Loading...</div>
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setAvatarFile(file)
  }

  const handleUpdate = async () => {
    setUpdating(true)

    let avatar_url = formData.avatar_url

    // Upload avatar if a new file is selected
    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop()
      const filePath = `avatars/${user.id}.${fileExt}`
      const supabase = createClient()
      const { error: uploadError } = await supabase.storage
        .from('profileimgs')
        .upload(filePath, avatarFile, { upsert: true })

      if (!uploadError) {
        ///const { data, error } = await supabase.storage.from('profile_avatars').download(path)
        //const url = URL.createObjectURL(data)
       // setAvatarUrl(url)
        const {
          data: { publicUrl },
        } = supabase.storage.from('profileimgs').getPublicUrl(filePath)
        avatar_url = publicUrl
      }
    }
const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ ...formData, avatar_url })
      .eq('id', user.id)

    if (!error) {
      setFormData({ ...formData, avatar_url })
      alert('Profile updated!')
    } else {
      console.error(error)
      alert('Update failed.')
    }

    setUpdating(false)
  }

  return (
    <div>
      <button
  onClick={() => setShowModal(true)}
  className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow"
>
  Edit Profile
</button>
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <form className="bg-white rounded-xl p-6 w-full max-w-xl relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
      >
        ×
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-teal-600">Edit Profile</h2>

      {/* FORM GOES HERE — reuse existing form JSX but remove outer wrapper & update state */}
      <div className="space-y-4">
           <div className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-teal-600">Edit Profile</h1>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex flex-col items-center">
          <img
            src={formData.avatar_url || '/default-avatar.png'}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3" />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex gap-6 items-center">
        <img
          src={user?.avatar_url || '/default-avatar.png'}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
        />

        <div>
          <h2 className="text-2xl font-semibold text-teal-700">{user?.full_name}</h2>
          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
          <p className="text-sm text-orange-600">{user.role || 'User'}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-teal-500">Bio</h3>
          <p className="text-gray-700">{user.bio || 'No bio provided.'}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-teal-500">Location</h3>
          <p className="text-gray-700">{user.location || 'Not specified'}</p>
        </div>
      </div>
      </div>

      <button
        formAction={handleUpdate}
        disabled={updating}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow"
      >
        {updating ? 'Updating...' : 'Save Changes'}
      </button>
    </form>
  </div>
)}

    <div className="mt-10">
        <h3 className="text-xl font-bold text-teal-600 mb-2">Your Jobs Summary</h3>
        {listings.length > 0 ? (
          <div className="space-y-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400 shadow-sm"
              >
                <h4 className="text-orange-600 font-semibold">{listing.title}</h4>
                <p className="text-sm text-gray-600">Status: {listing.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">You have no listings yet.</p>
        )}
        <a
          href="/dashboard"
          className="mt-4 inline-block text-teal-700 text-sm hover:underline"
        >
          Manage all listings →
        </a>
      </div>

      <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow">
        Edit Profile
      </button>  
      <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl shadow">
        Edit Profile
      </button>
    </div>
  )
}

export default UserObj
