export function Hero() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <h1 className="mt-24 text-4xl font-light tracking-wide text-gray-900 sm:mt-10 sm:text-5xl lg:text-6xl">
              YULIIA HOLOVATIUK-UNGUREANU
            </h1>
            <p className="mt-8 text-base font-light leading-relaxed text-gray-600 sm:text-lg">
              A multidisciplinary artist working across immersive installation,
              sculpture, ceramics, and material-based painting, engaging with
              archival materials, legal documents, and artefacts to examine how
              war, displacement, and the pursuit of justice shape pathways of
              healing, resilience, and rebuilding future realities.
            </p>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt="Artist workspace"
            src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2102&auto=format&fit=crop"
            className="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
}
