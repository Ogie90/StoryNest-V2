

## Task 2: Auth Screens Polish

The current Auth page is functional but minimal — a single card with email/password fields. Here's the plan to make it feel polished and trustworthy.

### Changes to `src/pages/Auth.tsx`

**Visual & Layout**
- Add a soft gradient or illustrated background (subtle pattern/shapes) to make the page feel warm, not blank
- Increase the logo area — add the app name "StoryNest" below the icon
- Better spacing, larger card with rounded-2xl corners and subtle shadow
- Animated transition between Sign In / Sign Up modes (opacity + slide)

**Form UX**
- Add a "Confirm Password" field in Sign Up mode with match validation
- Show/hide password toggle (eye icon)
- Inline validation hints (password min 6 chars, email format)
- Better error messages — map common Supabase errors to friendly copy:
  - "Invalid login credentials" → "Email or password is incorrect. Please try again."
  - "User already registered" → "This email already has an account. Try signing in instead."
  - "Email not confirmed" → "Please check your inbox and confirm your email first."

**Loading & Success States**
- Disable form inputs while loading (not just the button)
- On successful sign-up: show a success card with envelope icon, "Check your email" message, and a "Back to Sign In" button — replace the form entirely
- On successful sign-in: brief "Welcome back!" toast before navigating

**Trust & Polish**
- Add microcopy below the form: "Your stories are saved securely" with a lock icon
- "Back to home" link at the bottom
- Footer text: "By signing up, you agree to our Terms & Privacy Policy" (links to placeholder pages, ready for task 7)

**Mobile**
- Ensure proper viewport padding and input sizing for mobile keyboards
- Auto-focus email field on mount

### Files Modified
- `src/pages/Auth.tsx` — full rewrite with all the above

