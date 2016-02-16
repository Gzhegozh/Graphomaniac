# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

category_list = ['Poetry', 'Prose', 'Dramaturgy']

category_list.each do |category|
  Category.create(name: category)
end

Genre.create([{name: 'Poem', category_id: 1}, {name: 'Vers libre', category_id: 1}, {name: 'Ode', category_id: 1},
              {name: 'Ballad', category_id: 1}, {name: 'Madrigal', category_id: 1}, {name: 'Sonnet', category_id: 1}, {name: 'Haiku', category_id: 1}])
Genre.create([{name: 'Story', category_id: 2}, {name: 'Novel', category_id: 2}, {name: 'Tale', category_id: 2},
              {name: 'Novelette', category_id: 2}, {name: 'Essay', category_id: 2}, {name: 'Biography', category_id: 2}])
Genre.create([{name: 'Tragedy', category_id: 3}, {name: 'Comedy', category_id: 3}, {name: 'Drama', category_id: 3},
              {name: 'Tragicomedy', category_id: 3}])