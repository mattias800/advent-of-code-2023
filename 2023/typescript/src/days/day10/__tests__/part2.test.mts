import { getSolution } from "../part2.mts";
import fs from "fs";

describe("Day 10", () => {
  describe("Part 2 ", () => {
    describe("getSolution", () => {
      it("works with small test data", () => {
        expect(
          getSolution(
            "...........\n" +
              ".S-------7.\n" +
              ".|F-----7|.\n" +
              ".||.....||.\n" +
              ".||.....||.\n" +
              ".|L-7.F-J|.\n" +
              ".|..|.|..|.\n" +
              ".L--J.L--J.\n" +
              "...........",
          ),
        ).toBe(4);
      });
      it("works with second test data", () => {
        expect(
          getSolution(
            "..........\n" +
              ".S------7.\n" +
              ".|F----7|.\n" +
              ".||....||.\n" +
              ".||....||.\n" +
              ".|L-7F-J|.\n" +
              ".|..||..|.\n" +
              ".L--JL--J.\n" +
              "..........",
          ),
        ).toBe(4);
      });
      it("works with third test data", () => {
        expect(
          getSolution(
            ".F----7F7F7F7F-7....\n" +
              ".|F--7||||||||FJ....\n" +
              ".||.FJ||||||||L7....\n" +
              "FJL7L7LJLJ||LJ.L-7..\n" +
              "L--J.L7...LJS7F-7L7.\n" +
              "....F-J..F7FJ|L7L7L7\n" +
              "....L7.F7||L7|.L7L7|\n" +
              ".....|FJLJ|FJ|F7|.LJ\n" +
              "....FJL-7.||.||||...\n" +
              "....L---J.LJ.LJLJ...",
          ),
        ).toBe(8);
      });
      it("works with forth test data", () => {
        expect(
          getSolution(
            "FF7FSF7F7F7F7F7F---7\n" +
              "L|LJ||||||||||||F--J\n" +
              "FL-7LJLJ||||||LJL-77\n" +
              "F--JF--7||LJLJ7F7FJ-\n" +
              "L---JF-JLJ.||-FJLJJ7\n" +
              "|F|F-JF---7F7-L7L|7|\n" +
              "|FFJF7L7F-JF7|JL---7\n" +
              "7-L-JL7||F7|L7F-7F7|\n" +
              "L.L7LFJ|||||FJL7||LJ\n" +
              "L7JLJL-JLJLJL--JLJ.L",
          ),
        ).toBe(10);
      });
      it("works with input", () => {
        expect(
          getSolution(fs.readFileSync("./src/days/day10/input.txt").toString()),
        ).toBe(305);
      });
    });
  });
});
