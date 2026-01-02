'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { CATEGORIES, SiteConfig } from '@/lib/types'

interface HeaderProps {
  navigation: SiteConfig['navigation'];
}

export function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl lg:px-8">
        <nav aria-label="Global" className="flex items-center justify-between lg:justify-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">{navigation.openMenu}</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="hidden lg:flex lg:items-center lg:gap-x-12">
            <Link
              href="/"
              className="text-sm font-light tracking-wide text-gray-900 hover:text-gray-600 leading-6"
            >
              {navigation.home}
            </Link>
            <div className="relative group">
              <span className="text-sm font-light tracking-wide text-gray-900 hover:text-gray-600 cursor-pointer leading-6">
                {navigation.works}
              </span>
              <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/works/${category.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      {category.displayName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="text-sm font-light tracking-wide text-gray-900 hover:text-gray-600 leading-6"
            >
              {navigation.about}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-light tracking-wide text-gray-900 hover:text-gray-600 leading-6"
            >
              {navigation.contact}
            </Link>
          </div>
        </nav>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">{navigation.closeMenu}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navigation.home}
                </Link>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50">
                    {navigation.works}
                    <ChevronDownIcon aria-hidden="true" className="size-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/works/${category.slug}`}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.displayName}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navigation.about}
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navigation.contact}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
