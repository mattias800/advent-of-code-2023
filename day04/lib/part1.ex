defmodule Day04Part1 do
  def part1(input) do
    lines =
      input
      |> String.split("\n", trim: true)

    values_of_lines =
      lines
      |> Enum.map(fn line ->
        Enum.reduce(Day04Common.get_winning_numbers_from_card(line), 0, fn _, sum ->
          case sum do
            0 -> 1
            _ -> sum * 2
          end
        end)
      end)

    solution = values_of_lines |> Enum.sum() |> Integer.to_string()

    IO.puts("Part 1 solution: " <> solution)
  end
end
