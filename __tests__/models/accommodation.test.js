const { Accommodation, User } = require("../test-setup.js");


describe("Accommodation tests", () => {
   
  it("should create an accommodation", async () => {
        const user = await User.create({
          username: "testuser",
          email: "test@example.com",
        });

        const accommodation = await Accommodation.create({
          street: "Storgatan 20",       
          city: "Stockholm",
          country: "Sverige",
          postalCode: 12345,        
          rent: 1000,
          room: 3,
          userId: user.id,

        });
        expect(user).toBeDefined();
        expect(accommodation).toBeDefined();

        expect(accommodation.street).toBe("Storgatan 20");
        expect(accommodation.city).toBe("Stockholm");
        expect(accommodation.country).toBe("Sverige");
        expect(accommodation.postalCode).toBe(12345);
        expect(accommodation.rent).toBe(1000);
        expect(accommodation.room).toBe(3);
        expect(accommodation.userId).toBe(user.id);
        expect(accommodation.userId).toBeDefined();
        
    });

    it("Should CASCADE delete accommodation when user is deleted", async () => {
        const user = await User.create({
          username: "testuser2",
          email: "testuser2@mail.com"
        });
      
        const accommodation = await Accommodation.create({
          street: "Lillegatan 22",
          city: "Göteborg",
          country: "Sverige",
          postalCode: 54321,
          rent: 2000,
          room: 4,
          userId: user.id,
        });
        
        expect(accommodation.street).toBe("Lillegatan 22");

        const found = await Accommodation.findOne({ where: { userId: user.id } });
        expect(found).toBeDefined();
      
        await user.destroy();
      
        const deleted = await Accommodation.findOne({ where: { userId: user.id } });
        expect(deleted).toBeNull();
      });
});      