# 🔧 MongoDB Connection Error - Fix Guide

## ❌ Error

```
MongoDB connection error: Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.skoomtt.mongodb.net
```

## 🔍 What This Means

Your computer cannot connect to MongoDB Atlas because:

1. **Your IP is not whitelisted** (most common)
2. Wrong credentials
3. Network/firewall blocking the connection

---

## ✅ Solution (Follow These Steps)

### Step 1: Go to MongoDB Atlas Dashboard

1. Visit [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Login with your account
3. Select your cluster (Cluster0)

### Step 2: Add Your IP to Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"** button
3. **For Development (Easy):**
   - Click "Allow access from anywhere"
   - Click "0.0.0.0/0" (or manually enter)
   - Confirm

**For Production (Secure):**

- Add your specific IP address
- Run this to find your IP:
  ```bash
  curl ifconfig.me
  ```

4. Click **"Confirm"**

### Step 3: Whitelist takes effect

- Wait 1-2 minutes for changes to propagate
- Try connecting again

### Step 4: Test the Connection

```bash
node test-mongodb.js
```

Should output:

```
✅ MongoDB Connected Successfully!
```

---

## 🚀 If Still Not Working

### Option A: Use Local MongoDB (Quick Alternative)

**For Windows - Install MongoDB Community:**

1. Download: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run installer
3. Keep defaults and finish installation
4. MongoDB starts automatically

**Update .env:**

```
MONGODB_URI=mongodb://localhost:27017/dream-way
```

**Restart backend:**

```bash
npm run dev
```

### Option B: Double-Check Credentials

Your `.env` should have correct MongoDB URI:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.skoomtt.mongodb.net/?appName=Cluster0
```

**Verify each part:**

1. **username** - Your MongoDB user (not email)
2. **password** - Your MongoDB password (with special chars URL-encoded)
3. **cluster0** - Your cluster name
4. **skoomtt** - Your cluster suffix

If password has special characters, URL-encode them:

- `@` → `%40`
- `#` → `%23`
- `:` → `%3A`
- etc.

**To get correct URI:**

1. MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the full connection string
5. Replace `<password>` with actual password

### Option C: Check Network Status

**Windows:**

```powershell
# Check if you can reach MongoDB
Test-Connection cluster0.skoomtt.mongodb.net -Count 1
```

**Mac/Linux:**

```bash
# Check if you can reach MongoDB
ping cluster0.skoomtt.mongodb.net
```

---

## 📝 Diagnostic Steps

### Step 1: Verify .env

```bash
cd backend
cat .env
# Should show valid MONGODB_URI
```

### Step 2: Run MongoDB Test

```bash
node test-mongodb.js
```

**If it shows:**

- ✅ Connected → Backend should work now
- ❌ ECONNREFUSED → IP not whitelisted (see Step 2 above)
- ❌ ENOTFOUND → DNS/network issue
- ❌ authentication failed → Wrong credentials

### Step 3: Check Network Access in MongoDB Atlas

1. Go to MongoDB Atlas
2. Network Access
3. You should see your IP or "0.0.0.0/0"
4. If not, add it again

---

## 🎯 Common Issues

### Issue: "ECONNREFUSED"

**Solution:** Add your IP to MongoDB Atlas Network Access

### Issue: "authentication failed"

**Solution:**

- Check username is NOT your email
- Check password is entered correctly
- Generate new credentials if uncertain

### Issue: "ENOTFOUND"

**Solution:**

- Check internet connection
- Verify MongoDB URI spelling
- Try pinging the host (see above)

### Issue: "TIMEOUT"

**Solution:**

- Wait a few minutes (whitelist propagation)
- Check firewall/VPN not blocking port 27017

---

## 🚀 Restart Backend

Once fixed, restart:

```bash
npm run dev
```

You should see:

```
✓ MongoDB connected successfully
✓ Server running on port 5000
```

---

## ✅ Success Checklist

- [ ] MongoDB Atlas Network Access has your IP (0.0.0.0/0)
- [ ] .env has correct MONGODB_URI
- [ ] `node test-mongodb.js` shows ✅ Connected
- [ ] Backend starts with `npm run dev`
- [ ] Can signup/login from frontend

---

## 🆘 Still Stuck?

**Try Local MongoDB instead:**

1. Install MongoDB Community locally
2. Change .env to:
   ```
   MONGODB_URI=mongodb://localhost:27017/dream-way
   ```
3. Restart backend: `npm run dev`

This lets you move forward while troubleshooting Atlas connection.

---

## 📚 Resources

- [MongoDB Atlas Network Access](https://docs.mongodb.com/manual/reference/method/db.grantRolesToUser/)
- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [MongoDB Community Download](https://www.mongodb.com/try/download/community)
