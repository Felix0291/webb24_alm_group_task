const { User } = require("../test-setup.js");
const { UniqueConstraintError } = require("sequelize");

describe("User Model tests", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should validate email format", async () => {
    const user = User.build({ username: "testuser", email: "invalid-email" });
    await expect(user.validate()).rejects.toThrow();
  });

  // _____________________________DUPLICATES TESTS______________________________________

  it("should not allow users with the same username", async () => {
    await User.create({ username: "user", email: "user1@test.com" });

    await expect(
      User.create({ username: "user", email: "user2@test.com" })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should not allow duplicate email addresses", async () => {
    await User.create({ username: "user123", email: "unique_email@test.com" });

    await expect(
      User.create({ username: "user1234", email: "unique_email@test.com" })
    ).rejects.toThrow(UniqueConstraintError);
  });

  // _____________________________PROFILE PICTURE TESTS________________________________________

  it("should validate profilePic URL format", async () => {
    const userWithWrongTypeUrl = User.build({
      username: "testuser1",
      email: "test1@test.com",
      profilePic: "http://example.com/file.txt",
    });
    await expect(userWithWrongTypeUrl.validate()).rejects.toThrow(
      "Image URL must end with .jpg, .jpeg, .png or .gif"
    );

    const userWithIncorrectUrl = User.build({
      username: "testuser12345",
      email: "test12345@test.com",
      profilePic: "not-a-url",
    });
    await expect(userWithIncorrectUrl.validate()).rejects.toThrow(
      "Image URL must be a valid URL"
    );

    const userWithCorrectUrl = User.build({
      username: "testuser321",
      email: "test321@test.com",
      profilePic: "https://example.com/image.png",
    });
    await userWithCorrectUrl.validate();
  });
});
