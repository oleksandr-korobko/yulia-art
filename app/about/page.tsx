export default function AboutPage() {
  const instagramPosts = [
    'DHTyUkXKJk6',
    'DJ_0vD8Kym4',
    'C9WzUXTMVST',
    'DHim6h7tD7G',
    'DHygV96q_HB',
    'DQrU4I9DGi3',
    'DH_rbFqq3yo',
    'DHim6h7tD7G', // Using duplicate as we need 8 photos
  ];

  return (
    <main>
      {/* Profile Section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
          <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
            <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
              <img
                alt="Yuliia Holovatiuk-Ungureanu"
                src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2560&auto=format&fit=crop"
                className="absolute inset-0 size-full bg-gray-50 object-cover"
              />
            </div>
          </div>
          <div className="px-6 lg:contents">
            <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
              <h1 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
                About
              </h1>
              <div className="mt-6 max-w-xl text-base font-light leading-relaxed text-gray-700 lg:max-w-none">
                <p>
                  <strong>Yuliia Holovatiuk-Ungureanu</strong> (b. 1987, Lviv, Ukraine) is a multidisciplinary artist currently living and working in the United Kingdom. Her practice spans immersive installation, sculpture, ceramics, painting, and socially engaged art, with a strong focus on material research, historical narratives, and spatial experience.
                </p>
                <p className="mt-6">
                  At the core of her work lies a transformative process: moving from personal and collective experiences of war, displacement, and destruction toward questions of healing, resilience, and the possibility of a future shaped through conscious rebuilding. Rather than illustrating events, Yuliia works with matter itself — clay, soil, natural pigments, found artefacts, archival fragments, and official documents — allowing materials to carry memory, tension, and testimony.
                </p>
                <p className="mt-6">
                  Her installations often operate at the intersection of archive and lived space. Drawing on archival research, historical records, and legal documents, she examines how systems of power, responsibility, and justice are embedded within material traces. This research-driven approach is informed by her background in law, public leadership, and environmental policy, which continues to shape her sensitivity to structure, ethics, sustainability, and scale.
                </p>
                <p className="mt-6">
                  In her ceramic sculptures, modular forms echo processes of construction and reconstruction, referencing both childhood memory and adult responsibility, fragility and endurance. Her paintings function not as representations of external landscapes but as material objects, created through layered interactions of non-conventional pigments such as kumkum, sindur, turmeric, and earth, evoking inner transformation rather than visual description.
                </p>
                <p className="mt-6">
                  Yuliia&apos;s work has been presented in solo and group exhibitions in the UK and Europe, with works held in private collections in Ukraine, the United Kingdom, and Europe. She continues to develop projects that engage with public space, collective participation, and long-term dialogue around loss, continuity, and the search for peace.
                </p>

                <div className="mt-16">
                  <a
                    href="/cv.pdf"
                    className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-light text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Grid Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-light tracking-wide text-gray-900 sm:text-4xl">
            Recent Works
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Follow my journey on Instagram
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-4">
            {/* Row 1: Large + Small */}
            <a
              href={`https://instagram.com/p/${instagramPosts[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-4 lg:rounded-tl-4xl max-lg:rounded-t-4xl"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000001?q=80&w=1200&auto=format&fit=crop"
                alt="Instagram post 1"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${instagramPosts[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-2 lg:rounded-tr-4xl"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000002?q=80&w=800&auto=format&fit=crop"
                alt="Instagram post 2"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 2: Small + Large */}
            <a
              href={`https://instagram.com/p/${instagramPosts[2]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-2"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000003?q=80&w=800&auto=format&fit=crop"
                alt="Instagram post 3"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${instagramPosts[3]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-4"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000004?q=80&w=1200&auto=format&fit=crop"
                alt="Instagram post 4"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 3: Medium + Medium */}
            <a
              href={`https://instagram.com/p/${instagramPosts[4]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000005?q=80&w=1000&auto=format&fit=crop"
                alt="Instagram post 5"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${instagramPosts[5]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000006?q=80&w=1000&auto=format&fit=crop"
                alt="Instagram post 6"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Row 4: Small + Small + Small (but only 2 to make 8 total) */}
            <a
              href={`https://instagram.com/p/${instagramPosts[6]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3 lg:rounded-bl-4xl max-lg:rounded-b-4xl"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000007?q=80&w=1000&auto=format&fit=crop"
                alt="Instagram post 7"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <a
              href={`https://instagram.com/p/${instagramPosts[7]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:col-span-3 lg:rounded-br-4xl"
            >
              <img
                src="https://images.unsplash.com/photo-1500000000008?q=80&w=1000&auto=format&fit=crop"
                alt="Instagram post 8"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href="https://instagram.com/yuliia_art_uk_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-light text-gray-900 hover:text-gray-600"
            >
              View more on Instagram <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
