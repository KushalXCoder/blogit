# Blogit Optimization & Feature TODO List

This checklist contains all the key tasks, optimizations, and bug fixes you should implement to complete the project and back up your resume points with real code.

---

## 🛠️ Phase 1: Critical Bug Fixes (Do these first!)

- [x] **Fix 1: User Sign-up JWT Crash**
  - **Task:** In [auth.controller.ts:L85](file:///c:/Users/Admin/Desktop/indoc/src/controller/auth.controller.ts#L85), pass the newly created user object (from line 82) to `getTokenData()` instead of `exisitingUser` (which is `null` and causes a crash).
- [x] **Fix 2: Waitlist Duplicate Entry Loop**
  - **Task:** In [waitlist.controller.ts:L24-L26](file:///c:/Users/Admin/Desktop/indoc/src/controller/waitlist.controller.ts#L24-L26), add a `return` statement inside the `if(user)` block to stop execution and prevent creating a duplicate record in MongoDB.

---

## 🚀 Phase 2: Core Feature (The Publishing Engine)

- [ ] **Task 1: Add a Publish Route**
  - Create a new API route `/api/blog/publish` that:
    1. Checks the user's login session.
    2. Fetches the blog post from the database.
    3. Reads the user's saved Dev.to/Hashnode API keys.
- [ ] **Task 2: Integrate Dev.to REST API**
  - In your publish controller, make a POST request to `https://dev.to/api/articles` with the payload `{ article: { title, body_markdown, cover_image } }` using the user's `devtoKey` in the headers.
- [ ] **Task 3: Integrate Hashnode GraphQL API**
  - In your publish controller, make a POST request to `https://gql.hashnode.com` with a GraphQL mutation to create a publication post.
- [ ] **Task 4: Update Database Status**
  - Once published, update the `Blog` document status to `"published"` and save the returned article URLs (so the user can click and view them).

---

## ⚡ Phase 3: Performance & Rendering Optimizations

- [ ] **Task 1: Next.js ISR (Incremental Static Regeneration)**
  - **Task:** In your public blog route `src/app/(routes)/blog/[id]/page.tsx`, export a constant `export const revalidate = 60;`.
  - **Reason:** This caches the page at the CDN/Server level for 60 seconds, preventing MongoDB query bottlenecks when multiple readers visit the post.
- [ ] **Task 2: Debounced Auto-Saving**
  - **Task:** In the blog editor layout, implement background saving. Use a `useEffect` that listens to content changes and triggers `updateBlog()` service only after the user stops typing for `1500ms`.
- [ ] **Task 3: Database Selective Fetching (Projection)**
  - **Task:** In [blog.controller.ts:L60](file:///c:/Users/Admin/Desktop/indoc/src/controller/blog.controller.ts#L60), when fetching the list of blogs for the dashboard, add `.select("-content")` to the query.
  - **Reason:** Excludes the large body text when rendering list cards, saving bandwidth.
- [ ] **Task 4: Mongoose Database Indexing**
  - **Task:** In [user.model.ts](file:///c:/Users/Admin/Desktop/indoc/src/models/user.model.ts) and [blog.model.ts](file:///c:/Users/Admin/Desktop/indoc/src/models/blog.model.ts), ensure key search parameters like `email`, `username`, and the reference `user` are indexed (`index: true`).
- [ ] **Task 5: Infinite Scroll (Dashboard)**
  - **Task:** Implement infinite scrolling using the browser's native **Intersection Observer API** inside your blog list component, fetching page chunks (e.g., 6 posts at a time) as the user scrolls down.
- [ ] **Task 6: Mongoose Serverless Connection Cache**
  - **Task:** Rewrite [db.ts](file:///c:/Users/Admin/Desktop/indoc/src/lib/drivers/db.ts) to store the mongoose connection promise globally. This prevents serverless route re-executions from creating hundreds of parallel database connections.
