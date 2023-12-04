defmodule Day04Common do
  def numbers_string_to_list(numbersString) do
    numbersString
    |> String.split(" ", trim: true)
    |> Enum.map(fn n -> String.to_integer(n) end)
  end

  def get_winning_numbers_from_card(cardLine) do
    [_, nums] = cardLine |> String.split(":", trim: true)
    [winningString, ownedString] = nums |> String.trim() |> String.split("|")
    winning = numbers_string_to_list(winningString)

    numbers_string_to_list(ownedString)
    |> Enum.filter(fn o -> winning |> Enum.find_index(fn x -> o == x end) != nil end)
  end
end
