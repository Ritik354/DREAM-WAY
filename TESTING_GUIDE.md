# Testing Guide - Phase 1 Authentication

## ✅ Pre-Testing Checklist

- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] `.env` file created in backend/ with MongoDB URI
- [ ] MongoDB connection verified
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000

---

## 🧪 Test 1: Backend Health Check

**Objective**: Verify backend is running and accessible

### Steps

1. Open terminal
2. Run:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Expected Output

```json
{
  "message": "Dream Way Backend is running!"
}
```

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 2: User Registration (API)

**Objective**: Register a new user via API and receive JWT token

### Steps

1. Open Postman or terminal
2. Make POST request to:

   ```
   http://localhost:5000/api/auth/register
   ```

3. Headers:

   ```
   Content-Type: application/json
   ```

4. Body:
   ```json
   {
     "name": "Test User",
     "email": "test1@example.com",
     "password": "password123"
   }
   ```

### Expected Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Test User",
      "email": "test1@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 3: User Login (API)

**Objective**: Login with created user credentials

### Steps

1. Make POST request:

   ```
   http://localhost:5000/api/auth/login
   ```

2. Headers:

   ```
   Content-Type: application/json
   ```

3. Body:
   ```json
   {
     "email": "test1@example.com",
     "password": "password123"
   }
   ```

### Expected Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

**Copy the token** for next test.

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 4: Get Current User (Protected API)

**Objective**: Access protected endpoint with JWT token

### Steps

1. Make GET request:

   ```
   http://localhost:5000/api/auth/me
   ```

2. Headers:
   ```
   Authorization: Bearer <YOUR_TOKEN_FROM_TEST_3>
   Content-Type: application/json
   ```

### Expected Response

```json
{
  "success": true,
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Test User",
    "email": "test1@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 5: Invalid Token 401

**Objective**: Verify 401 response with invalid token

### Steps

1. Make GET request to `/api/auth/me` with:
   ```
   Authorization: Bearer invalid_token_12345
   ```

### Expected Response

```json
{
  "error": "Invalid token"
}
```

**Status Code**: 401

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 6: Signup via Frontend

**Objective**: Create user through web interface

### Steps

1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Fill form:
   - Name: `Frontend Test`
   - Email: `frontend@test.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Sign Up" button

### Expected Behavior

- ✅ No error message
- ✅ Redirected to dashboard
- ✅ See welcome message: "Welcome, Frontend Test!"
- ✅ Token stored in localStorage

### Verify Token Storage

1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Find key `token` with JWT value

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 7: Dashboard Display

**Objective**: Verify dashboard shows correct user info

### Steps

1. On Dashboard page, verify:
   - [ ] Welcome message shows correct name
   - [ ] Email is displayed correctly
   - [ ] "Member since" date is shown
   - [ ] Logout button is visible
   - [ ] Placeholder for roadmaps visible
   - [ ] Placeholder for progress visible

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 8: Logout

**Objective**: Test logout functionality

### Steps

1. On Dashboard, click "Logout" button

### Expected Behavior

- ✅ Token removed from localStorage
- ✅ Redirected to login page
- ✅ Cannot go back to dashboard without logging in

### Verify Logout

1. DevTools → Application → Local Storage
2. Token should be gone

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 9: Login via Frontend

**Objective**: Login with previously created account

### Steps

1. On login page, enter:
   - Email: `frontend@test.com`
   - Password: `password123`
2. Click "Login"

### Expected Behavior

- ✅ Redirected to dashboard
- ✅ Welcome message shown
- ✅ Token stored in localStorage

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 10: Protected Route Access

**Objective**: Verify protected routes work correctly

### Steps

1. Logout (token should be gone)
2. Manually type in address bar: `http://localhost:3000/dashboard`
3. Press Enter

### Expected Behavior

- ✅ Redirected to login page
- ✅ Cannot see dashboard content

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 11: Invalid Credentials

**Objective**: Test login with wrong password

### Steps

1. Go to login page
2. Enter:
   - Email: `frontend@test.com`
   - Password: `wrongpassword`
3. Click "Login"

### Expected Behavior

- ✅ Error message shown: "Invalid email or password"
- ❌ NOT redirected to dashboard
- ❌ Page stays on login

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 12: Duplicate Email

**Objective**: Test registration with existing email

### Steps

1. Go to signup page
2. Try to register with email already used: `frontend@test.com`
3. New password and name

### Expected Behavior

- ✅ Error message shown
- ❌ User not created
- ❌ Not logged in

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 13: Email Validation

**Objective**: Test email format validation

### Steps

1. Go to signup page
2. Try to register with invalid email: `notanemail`
3. Fill other fields normally

### Expected Behavior

- ✅ Browser validation shows error
- ❌ Cannot submit form

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 14: Password Confirmation

**Objective**: Test password mismatch validation

### Steps

1. Go to signup page
2. Fill:
   - Name: `Test `
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `different456`
3. Click "Sign Up"

### Expected Behavior

- ✅ Error message: "Passwords do not match"
- ❌ User not created

**Status**: ✅ Pass / ❌ Fail

---

## 🧪 Test 15: API Error Handling

**Objective**: Test missing required fields

### Steps

1. POST to `/api/auth/login` with only:
   ```json
   {
     "email": "test@example.com"
   }
   ```

### Expected Response

```json
{
  "error": "Please provide email and password"
}
```

**Status Code**: 400

**Status**: ✅ Pass / ❌ Fail

---

## 📊 Test Results Summary

| Test # | Description           | Status | Notes |
| ------ | --------------------- | ------ | ----- |
| 1      | Health Check          | [ ]    |       |
| 2      | Register API          | [ ]    |       |
| 3      | Login API             | [ ]    |       |
| 4      | Get Current User      | [ ]    |       |
| 5      | Invalid Token 401     | [ ]    |       |
| 6      | Frontend Signup       | [ ]    |       |
| 7      | Dashboard Display     | [ ]    |       |
| 8      | Logout                | [ ]    |       |
| 9      | Frontend Login        | [ ]    |       |
| 10     | Protected Routes      | [ ]    |       |
| 11     | Invalid Credentials   | [ ]    |       |
| 12     | Duplicate Email       | [ ]    |       |
| 13     | Email Validation      | [ ]    |       |
| 14     | Password Confirmation | [ ]    |       |
| 15     | API Error Handling    | [ ]    |       |

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution**:

- Check `.env` MongoDB URI is correct
- Verify IP whitelist in MongoDB Atlas includes your IP
- Try local MongoDB if using cloud

### Issue: "Token invalid" on protected endpoint

**Solution**:

- Copy token correctly (no extra spaces)
- Format: `Authorization: Bearer <token>`
- Token may have expired (check JWT_EXPIRE in .env)

### Issue: "CORS errors"

**Solution**:

- Ensure backend running on 5000
- Ensure frontend running on 3000
- Backend has CORS enabled by default

### Issue: "Cannot read property of null"

**Solution**:

- Check MongoDB connection
- Verify .env file has MONGODB_URI
- Restart backend

---

## ✅ All Tests Passing?

Congratulations! Phase 1 Authentication is fully working! 🎉

Ready for Phase 2? Request:

> "Create roadmap schema and APIs including Roadmap, Module, and Topic models"
