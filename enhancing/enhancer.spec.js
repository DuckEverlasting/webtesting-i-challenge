const enhancer = require("./enhancer.js");

sampleItem = { name: "Broadsword", durability: 24, enhancement: 10 };

describe("enhancement module", () => {
  describe("repair item", () => {
    it("sets durability to 100", () => {
      expect(
        enhancer.repair({ name: "Broadsword", durability: 24, enhancement: 10 }).durability
      ).toBe(
        100
      );
      expect(
        enhancer.repair({ name: "Broadsword", durability: 100, enhancement: 10 }).durability
      ).toBe(
        100
      );
      expect(
        enhancer.repair({ name: "Broadsword", durability: -16, enhancement: 10 }).durability
      ).toBe(
        100
      );
      expect(
        enhancer.repair({ name: "Broadsword", durability: 0, enhancement: 10 }).durability
      ).toBe(
        100
      );
      expect(
        enhancer.repair({ name: "Broadsword", enhancement: 10 }).durability
      ).toBe(
        100
      );
    });

    it("returns an otherwise equal item", () => {
      expect(
        enhancer.repair({ name: "Broadsword", durability: 24, enhancement: 10 })
      ).toStrictEqual(
        { name: "Broadsword", durability: 100, enhancement: 10 }
      );
      expect(
        enhancer.repair({ name: "", durability: 24, enhancement: 10 })
      ).toStrictEqual(
        { name: "", durability: 100, enhancement: 10 }
      );
      expect(
        enhancer.repair({ name: "Broadsword", durability: 24 })
      ).toStrictEqual(
        { name: "Broadsword", durability: 100 }
      );
    });

    describe("enhancement success", () => {
      it("increases enhancement by 1", () => {
        expect(
          enhancer.succeed({ name: "Broadsword", enhancement: 2, durability: 57 }).enhancement
        ).toBe(
          3
        );
        expect(
          enhancer.succeed({ name: "Broadsword", enhancement: 0, durability: 57 }).enhancement
        ).toBe(
          1
        );
      })

      it("doesn't raise enhancement above 20", () => {
        expect(
          enhancer.succeed({ name: "Broadsword", enhancement: 20, durability: 57 }).enhancement
        ).toBe(
          20
        );
      })

      it("doesn't change durability", () => {
        expect(
          enhancer.succeed({ name: "Broadsword", enhancement: 10, durability: 57 }).durability
        ).toBe(
          57
        );
        expect(
          enhancer.succeed({ name: "Broadsword", enhancement: 10, durability: NaN }).durability
        ).toBe(
          NaN
        );
      })
    });

    describe("enhancement failure", () => {
      it("decreases durability by 5 if enhancement is less than 15", () => {
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 10, durability: 57 }).durability
        ).toBe(
          52
        );
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 10, durability: 0 }).durability
        ).toBe(
          -5
        );
      })
      
      it("decreases durability by 10 if enhancement is 15 or greater", () => {
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 15, durability: 34 }).durability
        ).toBe(
          24
        );
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 17, durability: 4 }).durability
        ).toBe(
          -6
        );
      })

      it("decreases enhancement by 1 if enhancement is greater than 16", () => {
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 19, durability: 45 }).enhancement
        ).toBe(
          18
        );
      })

      it("doesn't change enhancement if enhancement is 16 or less", () => {
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 20, durability: 44 }).enhancement
        ).toBe(
          19
        );
        expect(
          enhancer.fail({ name: "Broadsword", enhancement: 16, durability: 44 }).enhancement
        ).toBe(
          16
        );
      })
    });

    describe("get name", () => {
      it("doesn't change name if enhancement is 0", () => {
        expect(
          enhancer.get({ name: "Broadsword", durability: 24, enhancement: 0 }).name
        ).toBe(
          "Broadsword"
        );
        expect(
          enhancer.get({ name: "Broodsword", durability: 24, enhancement: 0 }).name
        ).toBe(
          "Broodsword"
        );
      })

      it("adds enhancement level to the beginning of name if enhancement is greater than 0", () => {
        expect(
          enhancer.get({ name: "Breadsword", durability: 24, enhancement: 10 }).name
        ).toBe(
          "+10 Breadsword"
        );
        expect(
          enhancer.get({ name: "Skateboard", durability: 24, enhancement: 20 }).name
        ).toBe(
          "+20 Skateboard"
        );
      })

    });
  });
});
