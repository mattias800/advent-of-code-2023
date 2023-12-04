defmodule Day04Common do
  def numbersStringToList(numbersString) do
    numbersString
    |> String.split(" ", trim: true)
    |> Enum.map(fn n -> String.to_integer(n) end)
  end

  def getWinningNumbersFromCard(cardLine) do
    [_, nums] = cardLine |> String.split(":", trim: true)
    [winningString, ownedString] = nums |> String.trim() |> String.split("|")
    winning = numbersStringToList(winningString)

    numbersStringToList(ownedString)
    |> Enum.filter(fn o -> winning |> Enum.find_index(fn x -> o == x end) != nil end)
  end
end
