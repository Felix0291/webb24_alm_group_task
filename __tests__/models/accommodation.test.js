const { Accommodation, User } = require("../test-setup.js");


describe("Accommodation tests", () => {
   
  it("should create an accommodation", async () => {
        const user = await User.create({
          username: "testuser",
          email: "test@example.com",
        });

        const accommodation = await Accommodation.create({
          street: "shobaliba",       
          city: "Test City",
          country: "Test Country",
          postalCode: 12345,        
          rent: 1000,
          room: 3,
          userId: user.id,

        });
        expect(user).toBeDefined();
        expect(accommodation).toBeDefined();
        
    });
      
});
