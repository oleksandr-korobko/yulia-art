---
sectionTitle: "Recent Works"
sectionSubtitle: ""
viewMoreText: "View more on Instagram"
posts:
  - id: "DHTyUkXKJk6"
    image: "/images/instagram/instagram-1.jpg"
    alt: "Installation artwork detail"
  - id: "DJ_0vD8Kym4"
    image: "/images/instagram/instagram-2.jpg"
    alt: "Ceramic sculpture in progress"
  - id: "C9WzUXTMVST"
    image: "/images/instagram/instagram-3.jpg"
    alt: "Material-based painting close-up"
  - id: "DHim6h7tD7G"
    image: "/images/instagram/instagram-4.jpg"
    alt: "Archival work with text elements"
  - id: "DHygV96q_HB"
    image: "/images/instagram/instagram-5.jpg"
    alt: "Studio workspace view"
  - id: "DQrU4I9DGi3"
    image: "/images/instagram/instagram-6.jpg"
    alt: "Sculptural installation piece"
  - id: "DH_rbFqq3yo"
    image: "/images/instagram/instagram-7.jpg"
    alt: "Ceramic forms arrangement"
  - id: "DH_rbFqq3yo"
    image: "/images/instagram/instagram-8.jpg"
    alt: "Exhibition installation view"
---

# Instagram Feed

This file manages the Instagram posts grid displayed on the About page.

## How to Update

1. **Add new Instagram post:**
   - Export your Instagram image (1200x1200px, square)
   - Save it as `/public/images/instagram/instagram-X.jpg`
   - Add new entry to `posts` array above

2. **Get Instagram Post ID:**
   - Open your post in browser: `https://www.instagram.com/p/ABC123XYZ/`
   - Copy the ID part: `ABC123XYZ`
   - Use it in the `id` field

3. **Update the grid:**
   ```yaml
   - id: "YOUR_POST_ID"
     image: "/images/instagram/instagram-X.jpg"
     alt: "Description of your artwork"
   ```

The grid automatically alternates the layout pattern (4+2, 2+4, 4+2, 2+4...) based on the number of posts.
