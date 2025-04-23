import { returnProducts } from "../products/return-products";

const ServicesPage=async () =>{

  
  return (
    <div className=" min-h-screen">     
         <h2>Explore our Categories</h2>   

      {/* Filters & Sorting */}
      <aside className=" p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>All</option>
            <option>Photography</option>
            <option>Videography</option>
            <option>Drone Services</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="sort" className="block text-gray-700 text-sm font-bold mb-2">
            Sort By:
          </label>
          <select
            id="sort"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Newest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

















      <div className="bg-gray-100 min-h-screen">
     
      {/* Navigation */}
      <nav className="bg-white py-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-2xl font-bold">Logo</div>
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="hover:text-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Filters & Sorting */}
      <aside className="bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>All</option>
            <option>Photography</option>
            <option>Videography</option>
            <option>Drone Services</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="sort" className="block text-gray-700 text-sm font-bold mb-2">
            Sort By:
          </label>
          <select
            id="sort"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Newest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
           {/* Product Card */}
          <div className="bg-white rounded-lg shadow">
            <img
              src="/product-image.jpg"
              alt="Product Image"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Product Name</h3>
              <p className="text-gray-700">$99.99</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
      
    </div>
  );
}
export default ServicesPage