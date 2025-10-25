import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  ingredients: string[];
  steps: string[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Паста Карбонара',
    image: 'https://cdn.poehali.dev/projects/adaaa3bd-20ee-426f-a572-c7374b6d9e74/files/fd638a00-e8e9-48ef-9db3-0d8e619990e1.jpg',
    time: 30,
    difficulty: 'medium',
    category: 'Основные блюда',
    ingredients: ['Спагетти 400г', 'Бекон 200г', 'Яйца 4шт', 'Пармезан 100г', 'Чеснок 2 зубчика', 'Оливковое масло', 'Соль, перец'],
    steps: [
      'Поставьте большую кастрюлю с водой на сильный огонь. Когда вода закипит, добавьте 1 столовую ложку соли и опустите спагетти. Варите согласно инструкции на упаковке минус 1 минуту, чтобы паста осталась аль денте. Перед сливом обязательно отлейте 1 стакан воды от варки.',
      'Пока варится паста, нарежьте бекон полосками шириной 1 см. Разогрейте сковороду на среднем огне, добавьте 1 столовую ложку оливкового масла. Обжаривайте бекон 5-7 минут до золотистой корочки. За минуту до готовности добавьте измельченный чеснок.',
      'В глубокой миске взбейте венчиком 4 яйца до однородности. Добавьте 80г натертого пармезана и щепотку свежемолотого черного перца. Тщательно перемешайте до получения кремообразной массы.',
      'Слейте пасту и сразу же верните её в горячую кастрюлю. Снимите с огня. Добавьте бекон с чесноком, влейте яичную смесь и быстро перемешивайте, постепенно добавляя воду от варки (50-100мл), пока соус не станет кремообразным. Яйца не должны свернуться!',
      'Немедленно разложите карбонару по подогретым тарелкам. Посыпьте оставшимся пармезаном (20г), свежемолотым черным перцем и при желании добавьте свежую петрушку. Подавайте сразу, пока паста горячая.'
    ]
  },
  {
    id: 2,
    title: 'Шоколадный торт',
    image: 'https://cdn.poehali.dev/projects/adaaa3bd-20ee-426f-a572-c7374b6d9e74/files/c83a8873-5e04-4d04-8a45-5c44c47ad649.jpg',
    time: 90,
    difficulty: 'hard',
    category: 'Десерты',
    ingredients: ['Мука 200г', 'Какао 50г', 'Сахар 180г', 'Яйца 3шт', 'Масло сливочное 150г', 'Разрыхлитель 1ч.л.', 'Ягоды для украшения'],
    steps: [
      'Разогрейте духовку до 180°C. Подготовьте форму диаметром 22-24 см: смажьте сливочным маслом и присыпьте мукой или застелите пергаментной бумагой.',
      'В большой миске просейте муку (200г), какао-порошок (50г) и разрыхлитель (1 ч.л.). Тщательно перемешайте венчиком, чтобы не было комочков. Просеивание делает тесто более воздушным.',
      'В отдельной миске взбейте миксером 3 яйца со 180г сахара на высокой скорости 5-7 минут. Масса должна увеличиться в объеме в 2-3 раза, стать светлой и пышной. При поднятии венчика должна оставаться лента на поверхности.',
      'Растопите 150г сливочного масла и дайте немного остыть. Аккуратно введите сухую смесь в яичную массу порциями, перемешивая лопаткой снизу вверх. Затем влейте растопленное масло тонкой струйкой и бережно вмешайте до однородности.',
      'Вылейте тесто в подготовленную форму и разровняйте поверхность. Выпекайте 40-45 минут. Готовность проверяйте деревянной шпажкой — она должна выходить сухой. Дайте торту остыть в форме 10 минут, затем переложите на решетку до полного остывания.',
      'Полностью остывший торт покройте шоколадной глазурью или ганашем. Украсьте свежими ягодами (малина, клубника, черника), листиками мяты и тертым шоколадом. Для лучшего вкуса дайте торту настояться 2-3 часа в холодильнике.'
    ]
  },
  {
    id: 3,
    title: 'Тост с авокадо',
    image: 'https://cdn.poehali.dev/projects/adaaa3bd-20ee-426f-a572-c7374b6d9e74/files/2c15f40d-e98b-48ff-87af-9bf28fb6d480.jpg',
    time: 15,
    difficulty: 'easy',
    category: 'Завтраки',
    ingredients: ['Хлеб цельнозерновой 2 ломтика', 'Авокадо 1шт', 'Яйцо пашот 1шт', 'Лимонный сок', 'Соль, перец', 'Кунжут'],
    steps: [
      'Нарежьте цельнозерновой хлеб ломтиками толщиной 1-1.5 см. Подсушите в тостере 2-3 минуты до золотистого цвета или обжарьте на сухой сковороде с двух сторон. Хлеб должен быть хрустящим снаружи и мягким внутри.',
      'Разрежьте спелое авокадо пополам, удалите косточку. Выскребите мякоть ложкой в миску. Добавьте сок половины лимона, щепотку соли и свежемолотый черный перец. Разомните вилкой до состояния крем-пасты (можно оставить небольшие кусочки для текстуры).',
      'Вскипятите воду в небольшой кастрюле, добавьте 1 ст.л. уксуса. Создайте воронку, помешивая воду ложкой. Разбейте яйцо в чашку и аккуратно опустите в центр воронки. Варите 3-4 минуты на медленном огне. Достаньте шумовкой и промокните бумажным полотенцем.',
      'Щедрым слоем намажьте авокадную пасту на теплый тост, распределяя ее равномерно по всей поверхности. Можно слегка сбрызнуть оливковым маслом для дополнительного вкуса.',
      'Осторожно переложите яйцо пашот на авокадо, стараясь не повредить желток. Слегка надрежьте яйцо ножом — желток должен красиво растечься по тосту.',
      'Посыпьте тост обжаренным кунжутом, хлопьями чили, свежемолотым черным перцем и морской солью. Можно добавить микрозелень, семена чиа или тыквенные семечки. Подавайте немедленно, пока яйцо горячее.'
    ]
  }
];

const tips = [
  { id: 1, title: 'Секрет идеальной пасты', text: 'Добавьте немного воды от варки пасты в соус — крахмал сделает его кремообразным и поможет соусу лучше держаться на макаронах.' },
  { id: 2, title: 'Сочное мясо', text: 'Дайте мясу отдохнуть 5-10 минут после приготовления — соки распределятся равномерно, и мясо станет сочнее.' },
  { id: 3, title: 'Ароматная выпечка', text: 'Используйте комнатной температуры ингредиенты для теста — они лучше смешиваются и дают более воздушную текстуру.' }
];

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesTime = timeFilter === 'all' || 
      (timeFilter === '15' && recipe.time <= 15) ||
      (timeFilter === '30' && recipe.time <= 30) ||
      (timeFilter === '60' && recipe.time <= 60);
    
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTime && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              🍳 Кулинарная книга
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#recipes" className="text-gray-700 hover:text-primary transition-colors font-medium">Рецепты</a>
              <a href="#tips" className="text-gray-700 hover:text-primary transition-colors font-medium">Хитрости</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Готовьте с удовольствием
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Простые и вкусные рецепты для каждого дня. От быстрых завтраков до изысканных ужинов.
            </p>
            <Button size="lg" className="hover-scale text-lg px-8 py-6">
              <Icon name="ChefHat" size={24} className="mr-2" />
              Начать готовить
            </Button>
          </div>
        </div>
      </section>

      <section id="recipes" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Наши рецепты</h2>
          
          <div className="max-w-5xl mx-auto mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Поиск по названию или ингредиентам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Время приготовления" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любое время</SelectItem>
                  <SelectItem value="15">До 15 минут</SelectItem>
                  <SelectItem value="30">До 30 минут</SelectItem>
                  <SelectItem value="60">До 1 часа</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Сложность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая сложность</SelectItem>
                  <SelectItem value="easy">Легко</SelectItem>
                  <SelectItem value="medium">Средне</SelectItem>
                  <SelectItem value="hard">Сложно</SelectItem>
                </SelectContent>
              </Select>

              {(timeFilter !== 'all' || difficultyFilter !== 'all' || searchQuery) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setTimeFilter('all');
                    setDifficultyFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredRecipes.map((recipe, index) => (
              <Card 
                key={recipe.id} 
                className="overflow-hidden hover-scale cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white`}>
                      {getDifficultyText(recipe.difficulty)}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{recipe.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      {recipe.time} мин
                    </span>
                    <Badge variant="secondary">{recipe.category}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600">Рецепты не найдены. Попробуйте изменить фильтры.</p>
            </div>
          )}
        </div>
      </section>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedRecipe(null)}>
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-80">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <Button 
                variant="secondary" 
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={() => setSelectedRecipe(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">{selectedRecipe.title}</h2>
              <div className="flex items-center gap-4 mb-6">
                <Badge className={`${getDifficultyColor(selectedRecipe.difficulty)} text-white`}>
                  {getDifficultyText(selectedRecipe.difficulty)}
                </Badge>
                <span className="flex items-center gap-2 text-gray-600">
                  <Icon name="Clock" size={20} />
                  {selectedRecipe.time} минут
                </span>
                <Badge variant="secondary">{selectedRecipe.category}</Badge>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} className="text-primary" />
                  Ингредиенты
                </h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-500 mt-0.5" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Flame" size={24} className="text-primary" />
                  Приготовление
                </h3>
                <ol className="space-y-4">
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <p className="pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>
        </div>
      )}

      <section id="tips" className="py-16 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Кулинарные хитрости</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={tip.id} className="p-6 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name="Lightbulb" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🍳 Кулинарная книга</h2>
          <p className="text-gray-400 mb-6">Вкусные рецепты для каждого дня</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Facebook" size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Youtube" size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-8">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;