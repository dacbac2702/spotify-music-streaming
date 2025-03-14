const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// POST route sẽ giúp đăng ký người dùng
router.post("/register", async (req, res) => {
  // Code chạy khi api /register được gọi như một POST request

  // req.body có định dạng {email, password, firstName, lastName, username }
  const { email, password, firstName, lastName, username } = req.body;

  // Bước 2: Người dùng có email này đã tồn tại chưa? Nếu có, chúng tôi sẽ báo lỗi.
  const user = await User.findOne({ email: email });
  if (user) {
    // status code by default is 200
    return res.status(403).json({ error: "Email này đã tồn tại" });
  }
  // Valid request

  // Bước 3: Tạo người dùng mới trong DB
  // Step 3.1: Không lưu trữ mật khẩu ở dạng văn bản thuần túy.
  // xyz: chuyển đổi mật khẩu dạng văn bản thuần túy thành hàm băm (hash password).
  // xyz --> asghajskbvjacnijhabigbr
  // Hàm băm xyz phụ thuộc vào 2 tham số.
  // Nếu giữ nguyên 2 tham số đó, xyz luôn cung cấp cùng một hàm băm.
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);
  console.log(newUserData);

  // Bước 4: Tạo token để trả về cho người dùng
  const token = await getToken(email, newUser);

  // Bước 5: Trả kết quả về cho người dùng
  const userToReturn = { ...newUser.toJSON(), token };
  console.log(userToReturn);
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});


module.exports = router;
