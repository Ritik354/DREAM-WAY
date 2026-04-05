# 🆘 Troubleshooting Guide

## Common Issues & Solutions

---

## ❌ Issue 1: JWT_SECRET Error

### Error Message

```
{
  "success": false,
  "error": "secretOrPrivateKey must have a value"
}
```

### Cause

- `.env` file doesn't exist
- `JWT_SECRET` is not set in `.env`
- `JWT_SECRET` is empty or has only whitespace

### Solution

**Step 1: Create .env from template**

```bash
cd backend
cp .env.example .env
```

**Step 2: Edit .env and set JWT_SECRET**

```
JWT_SECRET=your_random_secret_key_here_at_least_10_chars
```

**Step 3: Restart backend**

```bash
npm run dev
```

**Step 4: Verify setup**

```bash
node verify-setup.js
```

---

## ❌ Issue 2: Cannot Connect to MongoDB

### Error Message

```
MongoDB connection error: MongoError: connect ECONNREFUSED 127.0.0.1:27017
```

### Cause

- MongoDB is not running (local)
- Invalid MongoDB Atlas connection string
- Network connectivity issues
- IP not whitelisted (MongoDB Atlas)

### Solution

**For MongoDB Atlas (Cloud):**

1. Get connection string:
   - Go to MongoDB Atlas dashboard
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

2. Edit `.env`:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dream-way
   ```

3. Replace `username`, `password` with your credentials

4. Whitelist your IP:
   - MongoDB Atlas → Network Access
   - Choose 0.0.0.0/0 for development
   - Or add your specific IP

**For Local MongoDB:**

1. Start MongoDB service:

   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

2. Edit `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/dream-way
   ```

---

## ❌ Issue 3: "Cannot find module" Error

### Error Message

```
Error: Cannot find module '@/path/to/file'
```

### Cause

- Missing node_modules
- Import path is incorrect
- File doesn't exist

### Solution

**Reinstall dependencies:**

```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

---

## ❌ Issue 4: Port Already in Use

### Error Message

```
Error: listen EADDRINUSE: address already in use :::5000
```

### Cause

- Backend already running on port 5000
- Another application using port 5000

### Solution

**Option A: Kill process on port 5000**

macOS/Linux:

```bash
lsof -i :5000
# Find PID and kill it
kill -9 <PID>
```

Windows:

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Option B: Use different port**

Edit `.env`:

```
PORT=5001
```

Then restart backend.

---

## ❌ Issue 5: CORS Errors

### Error Message

```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/login' has been blocked by CORS policy
```

### Cause

- Frontend and backend running on different origins
- Backend CORS not properly configured
- Wrong proxy configuration

### Solution

**Check frontend proxy:**

Edit `frontend/vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

**Restart both:**

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

---

## ❌ Issue 6: 401 Unauthorized on Protected Routes

### Error Message

```
{
  "error": "Invalid token"
}
```

### Cause

- Token not sent in Authorization header
- Token is expired (7 days old)
- Token is malformed

### Solution

**Check token in DevTools:**

1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for `token` key
4. If missing, login again

**Check token format:**

- Should be: `Authorization: Bearer <token>`
- NOT: `Authorization: <token>`

**Test with curl:**

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ❌ Issue 7: Registration Fails with Email Already Exists

### Error Message

```
{
  "success": false,
  "error": "User already exists with this email"
}
```

### Cause

- You're trying to register with an email already in database

### Solution

Use a different email address:

```json
{
  "name": "John Doe",
  "email": "john.new@example.com",
  "password": "password123"
}
```

Or clear the database from MongoDB Atlas and try again.

---

## ❌ Issue 8: Frontend Signup Not Working

### Error Message

Can't see error, page just doesn't respond

### Cause

- Backend not running
- API endpoint returning error
- Network request failing silently

### Solution

**Step 1: Check backend is running**

```bash
curl http://localhost:5000/api/health
# Should return: {"message":"Dream Way Backend is running!"}
```

**Step 2: Check browser DevTools**

1. Open DevTools (F12)
2. Go to Network tab
3. Try signup again
4. Check the request/response in Network tab

**Step 3: Check console**

1. Go to Console tab
2. Look for red error messages

---

## ❌ Issue 9: Token Not Saving in localStorage

### Cause

- Browser blocking localStorage (incognito mode)
- Privacy settings
- Issue with API response

### Solution

**Test localStorage manually:**

```javascript
// In browser console
localStorage.setItem("test", "value");
console.log(localStorage.getItem("test"));
localStorage.removeItem("test");
```

**If localStorage works:**

- Check API response includes token
- Check DevTools Network tab for `/api/auth/login` response

---

## ❌ Issue 10: "Cannot read property 'data' of undefined"

### Cause

- API response format unexpected
- Frontend expecting different response structure

### Solution

**Check API response format:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass"}'
```

Expected response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

---

## 🆘 Quick Diagnostic Steps

Follow these in order:

1. **Verify .env file**

   ```bash
   cd backend
   cat .env
   # Should show all required variables
   ```

2. **Run setup verification**

   ```bash
   node verify-setup.js
   ```

3. **Check backend logs**

   ```
   Look for errors when backend starts
   should see: ✓ MongoDB connected successfully
   ```

4. **Test health endpoint**

   ```bash
   curl http://localhost:5000/api/health
   ```

5. **Check browser console**

   ```
   DevTools → Console tab
   Look for any red errors
   ```

6. **Test API directly**
   ```bash
   Use Postman or curl to test endpoints
   Check actual error messages
   ```

---

## 📝 Setup Verification Checklist

- [ ] `.env` file exists in `backend/`
- [ ] `JWT_SECRET` is set and not empty
- [ ] `MONGODB_URI` is set correctly
- [ ] MongoDB is running/accessible
- [ ] Backend starts successfully with `npm run dev`
- [ ] Health endpoint works: `curl http://localhost:5000/api/health`
- [ ] Frontend runs with `npm run dev`
- [ ] Can access `http://localhost:3000`
- [ ] Signup works and redirects to dashboard
- [ ] Token appears in localStorage after signup
- [ ] Can logout and login again

---

## 🆘 Still Stuck?

**Check these files for context:**

- `QUICK_START.md` - Full setup guide
- `PHASE_1_COMPLETE.md` - API documentation
- `FIX_JWT_SECRET_ERROR.md` - JWT error specifically
- `TESTING_GUIDE.md` - Test endpoints

**Debug Command:**

```bash
NODE_ENV=development npm run dev
```

Look at the console output for specific error messages.

---

## 💡 Pro Tips

1. **Use VS Code REST Client** to test APIs easily
2. **Clear browser cache** with Ctrl+Shift+Delete
3. **Check MongoDB collections** in MongoDB Atlas UI
4. **Use `node verify-setup.js`** before every restart
5. **Keep .env out of git** - already in `.gitignore`

---

## 📞 Getting Help

When asking for help, provide:

1. The exact error message
2. Terminal output from backend
3. Network response from DevTools
4. Contents of .env (without sensitive values)
