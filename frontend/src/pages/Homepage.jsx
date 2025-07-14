import React from 'react';
import Navbar from '../components/Navbar';
import Blogs from '../components/Blogs';

function Homepage() {
  return (
    <>
      <Navbar />

      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl sm:text-6xl font-bold text-center text-gray-800 mb-10'>
          Blog Platform
        </h1>

        <section>
          <Blogs />
        </section>
      </main>
    </>
  );
}

export default Homepage;
