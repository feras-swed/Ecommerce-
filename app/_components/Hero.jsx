import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-neutral-950">
        All Ypur Digetal Brogect
        <strong className="font-extrabold text-primary sm:block"> Increase Conversion. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed  text-neutral-950">
       Is One Click Away
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
      
          <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/50 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-slate-950 shadow hover:text-primary focus:outline-none focus:ring active:text-emerald-700 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero