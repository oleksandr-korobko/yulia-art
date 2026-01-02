export function Hero() {
  return (
    <div className="bg-white pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light tracking-wide text-gray-900 sm:text-5xl lg:text-6xl">
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
          <div className="relative overflow-hidden rounded-lg">
            <img
              alt="Artist workspace"
              src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2102&auto=format&fit=crop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
