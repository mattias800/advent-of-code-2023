defmodule Day04 do
  @moduledoc """
  Documentation for `Day04`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day04.hello()
      :world

  """
  def hello do
    content = File.read!("input.txt")

    Day04Part1.part1(content)
    Day04Part2.part2(content)
  end
end
