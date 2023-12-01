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

  def handle_both_parts(content) do
    IO.puts "- Part 1 -"
    handle_content(content, fn (t) -> t end) |> IO.inspect
    IO.puts "- Part 2 -"
    handle_content(content, &Day01.replace_string_numbers/1) |> IO.inspect
  end

  def handle_content(content, mapper) do
    rows = Enum.filter(String.split(content, "\n", trim: true), fn (x) -> x != "" end)
    nums = Enum.map(rows, fn (row) -> get_num_from_row(mapper.(row)) end)
    nums |> sum_list
  end

  def replace_string_numbers(row) do
    replace_1 = replace_num("one", "one1one");
    replace_2 = replace_num("two", "two2two");
    replace_3 = replace_num("three", "three3three");
    replace_4 = replace_num("four", "four4four");
    replace_5 = replace_num("five", "five5five");
    replace_6 = replace_num("six", "six6six");
    replace_7 = replace_num("seven", "seven7seven");
    replace_8 = replace_num("eight", "eight8eight");
    replace_9 = replace_num("nine", "nine9nine");
    row |> replace_1.() |>
      replace_2.() |>
      replace_3.() |>
      replace_4.() |>
      replace_5.() |>
      replace_6.() |>
      replace_7.() |>
      replace_8.() |>
      replace_9.()
  end

  def get_num_from_row(s) do
    r = String.replace(s, ~r/[^\d]/, "")
    num = String.first(r) <> String.last(r)
    String.to_integer(num)
  end

  def sum_list(list) do
    Enum.reduce(list, 0, fn x, acc -> x + acc end)
  end

  def replace_num(num_string, num) do
    fn (s) -> String.replace(s, num_string, num) end
  end

  def hello do
    t = File.read("input.txt")

    case t do
      {:ok, content} -> handle_both_parts content
      _ -> IO.puts "Cannot read file."
    end

    :world
  end
end
