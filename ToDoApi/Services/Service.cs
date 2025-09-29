using ToDoApi.Models;

namespace ToDoApi.Services
{
    public class Service
    {
        private readonly List<Item> _items = [];

        public List<Item> GetItems() => _items;

        public Item? GetItemById(int id) => _items.FirstOrDefault(item => item.Id == id);

        public Item Add(Item item)
        {
            item.Id = _items.Count != 0 ? _items.Last().Id : 0;

            _items.Add(item);

            return item;
        }

        public bool Delete(int id)
        {
            var item = _items.FirstOrDefault(item => item.Id == id);

            if (item != null)
            {
                _items.Remove(item);

                return true;
            }

            return false;
        }
    }
}
