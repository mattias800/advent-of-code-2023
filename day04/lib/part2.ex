defmodule Day04Part2 do
  def part2(input) do
    lines =
      input
      |> String.split("\n", trim: true)
      |> Enum.map(&Day04Common.get_winning_numbers_from_card/1)

    solution =
      lines
      |> Enum.with_index()
      |> Enum.reduce(0, fn {_, lineNumber}, sum ->
        sum + 1 + get_num_won_cards(lines, lineNumber)
      end)
      |> Integer.to_string()

    IO.puts("Part 2 solution: " <> solution)
  end

  def get_num_won_cards(winning_numbers_by_lines, line_number) do
    cond do
      line_number >= length(winning_numbers_by_lines) ->
        0

      true ->
        winning_numbers = Enum.at(winning_numbers_by_lines, line_number)

        cond do
          length(winning_numbers) === 0 ->
            0

          true ->
            low = line_number + 1
            high = line_number + length(winning_numbers)
            wonCardNumbers = Enum.to_list(low..high)

            Enum.reduce(wonCardNumbers, length(winning_numbers), fn item, sum ->
              sum + get_num_won_cards(winning_numbers_by_lines, item)
            end)
        end
    end
  end
end
