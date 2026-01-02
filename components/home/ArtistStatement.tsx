export function ArtistStatement() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-900 px-6 pt-64 pb-9 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <img
                alt="Artist at work"
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop"
                className="absolute inset-0 size-full rounded-lg object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gray-900 mix-blend-multiply opacity-40" />
            </div>
          </div>
          <div>
            <div className="text-base font-light leading-relaxed text-gray-700 lg:max-w-lg">
              <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                Artist Statement
              </h2>
              <div className="max-w-xl">
                <p className="mt-6">
                  My practice develops through intersections rather than fixed
                  categories. I am interested in how forms, materials, and processes
                  meet, overlap, and transform one another over time. A sculptural
                  gesture may carry archival language, a ceramic structure may operate
                  spatially, and a painted surface may function as an object rather
                  than an image.
                </p>
                <p className="mt-8">
                  The work emerges from lived experience marked by war, displacement,
                  and rupture, yet it does not centre on trauma itself. Instead, it
                  attends to shifts — moments where pressure changes form, fragility
                  gains resistance, and silence becomes an active condition. I am
                  interested in how material holds unresolved histories — historical,
                  emotional, and political — and how meaning emerges through labour,
                  repetition, erosion, and physical endurance rather than direct
                  representation.
                </p>
                <p className="mt-8">
                  Working with clay, natural pigments, artefacts, and archival
                  materials, I create situations where memory becomes spatial and
                  tactile. Many of my works search for ways of releasing tension,
                  restoring balance, and imagining future-oriented forms of
                  coexistence. For me, this practice is an ongoing process of becoming
                  — a way of moving toward peace, both personal and collective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
