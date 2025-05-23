const { User } = require("../test-setup.js");
const { UniqueConstraintError } = require("sequelize");



describe("User Model tests", () => {
  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com" })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should validate email format", async () => {
    // Build: Create a new user instance without saving it to the database
    const user = await User.build({ username: "testuser", email: "invalid-email" });
    // Validate: Check if the user instance is valid
    // rejects.toThrow() is used to check if the user instance is invalid
    expect(user.validate()).rejects.toThrow();
  });

  it("should not allow users with the same username", async () => {
    await User.create({ username: "user", email: "user1@test.com" });

    await expect(
      User.create({ username: "user", email: "user2@test.com" })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should not allow duplicate email adresses", async () => {
    await User.create({ username: "user123", email: "unique_email@test.com" });

    await expect(
      User.create({ username: "user1234", email: "unique_email@test.com" })
    ).rejects.toThrow(UniqueConstraintError);
  });

});
