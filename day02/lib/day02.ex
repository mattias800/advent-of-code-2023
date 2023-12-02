defmodule Day02 do
  @moduledoc """
  Documentation for `Day02`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day02.hello()
      :world

  """
  def hello do
    content = File.read!("input.txt")
    content |> part1
    content |> Part2.part2()
  end

  def part1(content) do
    String.split(content, "\n", trim: true)
    |> Enum.map(&get_game_info/1)
    |> Enum.filter(&is_game_possible/1)
    |> Enum.map(fn %{game_number: game_number} -> game_number end)
    |> Enum.sum()
    |> IO.inspect()
  end

  def is_game_possible(%{grabs: grabs}) do
    is_game_grabs_possible(grabs)
  end

  # "9 blue, 9 green; 1 green, 3 blue; 8 blue, 6 red, 5 green; 1 green, 9 red, 1 blue"
  def is_game_grabs_possible(grabs_string) do
    grabs = String.split(grabs_string, ";", trim: true)
    Enum.all?(grabs, fn g -> is_grab_possible(g) end)
  end

  # "9 blue, 9 green"
  def is_grab_possible(grab) do
    parts = String.split(grab, ",", trim: true)
    Enum.all?(parts, fn p -> is_grab_num_color_possible(p) end)
  end

  # "3 blue"
  def is_grab_num_color_possible(grab_color) do
    [num, color] = String.split(grab_color, " ", trim: true)
    is_grab_color_possible(String.to_integer(num), color)
  end

  def is_grab_color_possible(num, "red") when num > 12 do
    false
  end

  def is_grab_color_possible(num, "green") when num > 13 do
    false
  end

  def is_grab_color_possible(num, "blue") when num > 14 do
    false
  end

  def is_grab_color_possible(_, _) do
    true
  end

  def get_game_info("Game " <> <<game_number::binary-1>> <> ": " <> grabs) do
    %{game_number: String.to_integer(game_number), grabs: grabs}
  end

  def get_game_info("Game " <> <<game_number::binary-2>> <> ": " <> grabs) do
    %{game_number: String.to_integer(game_number), grabs: grabs}
  end

  def get_game_info("Game " <> <<game_number::binary-3>> <> ": " <> grabs) do
    %{game_number: String.to_integer(game_number), grabs: grabs}
  end
end
