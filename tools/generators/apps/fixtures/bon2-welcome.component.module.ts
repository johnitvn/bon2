import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '{prefix}-bon2-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="overflow-hidden bg-white py-8 sm:py-16">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome {appName}</h1>
      <p class="mt-1 text-md leading-8 text-gray-600">This is frontend {type} application</p>

      <p class="mt-6 text-lg leading-8 text-gray-600">Our philosophy is: seamless, high scalability, high availability
        and fault tolerance</p>
      <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
        <div class="relative pl-9">
          <dt class="inline font-semibold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor" aria-hidden="true" class="absolute left-1 top-1 h-5 w-5 text-indigo-600">
              <path
                d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z">
              </path>
              <path
                d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z">
              </path>
              <path
                d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z">
              </path>
            </svg>Fullstack
          </dt>
          <dd class="inline">
            This boilerplate provides a monorepo stack with angular for frontend and nestjs for
            backend. Both use typescript and
            have a similar structure that helps fullstack devlopers have as seamless a mindset as possible. And manage
            them in a
            monorepo under nx management
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              class="absolute left-1 top-1 h-5 w-5 text-indigo-600">
              <path fill-rule="evenodd"
                d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                clip-rule="evenodd"></path>
            </svg>
            Scaleable more and more
          </dt>
          <dd class="inline">We use microservices and micro frontends architecture. Microservices communicate with each
            other via kafka. From there,
            the system has high scalability, high availability and fault tolerance</dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor" aria-hidden="true" class="absolute left-1 top-1 h-5 w-5 text-indigo-600">
              <path fill-rule="evenodd"
                d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
                clip-rule="evenodd"></path>
              <path
                d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z">
              </path>
            </svg>Not go fast but go far
          </dt>
          <dd class="inline">We include tools for management wokrflow and ensure code quality. If you don't have
            background knowledge of the tools and frameworks we use, you may spend a lot of time reading the
            documentation. But once you get the hang of it you can go further</dd>
        </div>
      </dl>
    </div>
  </div>
</section>
`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class Bon2WelcomeComponent { }
