defmodule Part2 do
  def part2(content) do
    String.split(content, "\n", trim: true)
    |> Enum.map(&Day02.get_game_info/1)
    |> Enum.map(&get_max_for_grabs/1)
    |> Enum.map(&get_power_of_colors/1)
    |> Enum.sum()
    |> IO.inspect()
  end

  # "2 red, 3 green, 5 blue; 5 red, 5 blue, 7 green; 2 red, 5 blue, 5 green; 6 red, 5 blue, 2 green"
  def get_max_for_grabs(%{grabs: grabs}) do
    String.split(grabs, [";", ","], trim: true)
    |> Enum.reduce(
      %{red: 0, green: 0, blue: 0},
      fn x, acc ->
        [num_string, color] = String.split(x, " ", trim: true)
        num = String.to_integer(num_string)

        case color do
          "red" -> %{acc | red: max(acc.red, num)}
          "green" -> %{acc | green: max(acc.green, num)}
          "blue" -> %{acc | blue: max(acc.blue, num)}
        end
      end
    )
  end

  def get_power_of_colors(%{red: red, green: green, blue: blue}) do
    red * green * blue
  end
end
