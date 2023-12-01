defmodule Day01 do
  @moduledoc """
  Documentation for `Day01`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day01.hello()
      :world

  """
  def hello do
    t = """
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
"""
    parts = String.split(t, "\n")
    parts2 = Stream.filter(parts, fn (x) -> x != "" end)
    Enum.to_list(parts2) |> IO.inspect
    :world
  end
end
