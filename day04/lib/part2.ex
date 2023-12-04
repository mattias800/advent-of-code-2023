defmodule Day04Part2 do
  def part2(input) do
    lines =
      input
      |> String.split("\n", trim: true)
      |> Enum.map(&Day04Common.getWinningNumbersFromCard/1)

    solution =
      lines
      |> Enum.with_index()
      |> Enum.reduce(0, fn {_, lineNumber}, sum ->
        sum + 1 + getNumWonCards(lines, lineNumber)
      end)
      |> Integer.to_string()

    IO.puts("Part 2 solution: " <> solution)
  end

  def getNumWonCards(winningNumbersByLines, lineNumber) do
    cond do
      lineNumber >= length(winningNumbersByLines) ->
        0

      true ->
        winningNumbers = Enum.at(winningNumbersByLines, lineNumber)

        cond do
          length(winningNumbers) === 0 ->
            0

          true ->
            low = lineNumber + 1
            high = lineNumber + length(winningNumbers)
            wonCardNumbers = Enum.to_list(low..high)

            Enum.reduce(wonCardNumbers, length(winningNumbers), fn item, sum ->
              sum + getNumWonCards(winningNumbersByLines, item)
            end)
        end
    end
  end
end
