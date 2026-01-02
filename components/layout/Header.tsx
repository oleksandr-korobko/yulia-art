'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { CATEGORIES } from '@/lib/types'

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 pt-6 lg:px-8">
          <nav aria-label="Global" className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-sm font-light tracking-widest text-gray-900">
                YULIIA HOLOVATIUK-UNGUREANU
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-light tracking-wide text-gray-900 hover:text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
              <Disclosure as="div" className="relative">
                <DisclosureButton className="flex items-center gap-x-1 text-sm font-light tracking-wide text-gray-900 hover:text-gray-600">
                  WORKS
                  <ChevronDownIcon aria-hidden="true" className="size-4" />
                </DisclosureButton>
                <DisclosurePanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
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
                </DisclosurePanel>
              </Disclosure>
            </div>
          </nav>
        </div>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-sm font-light tracking-widest text-gray-900">
                YULIIA HOLOVATIUK-UNGUREANU
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-light tracking-wide text-gray-900 hover:bg-gray-50">
                    WORKS
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
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
