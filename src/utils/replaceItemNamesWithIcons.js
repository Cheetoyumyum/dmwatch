const itemNameToIcon = {
  "dharok armour set": "dharok-set.png",
  "guthans armour set": "guthans-set.png",
  "dharoks greataxe": "dharok-greataxe.png",
  "dragon boots": "dragon-boots.png",
  "dragon claws": "Dragon_claws.png",
  "brimstone ring": "Brimstone_ring.png",
  "primordial boots": "Primordial-boots.png",
  "elder maul": "elder-maul.png",
  "abyssal whip": "abyssal-whip.png",
  "dragon dagger": "dragon-dagger.png",
  "Elysian spirit shield": "elysian-spirit-shield.png",
  "ags": "armadyl-god-sword.png",
  "amulet of torture": "amulet-of-torture.png",
  "amulet of strength": "amulet-of-strength.png",
  "amulet of glory": "amulet-of-glory.png",
  "amulet of fury" : "amulet-of-fury.png",
  "inquisitors set" : "inquisitors-armour-set.png",
};

function replaceItemNamesWithIcons(items) {
  const itemsArray = items.split(', ');
  const itemsWithIcons = itemsArray.map((itemName, index) => {
    const lowerItemName = itemName.toLowerCase();
    const matchingItem = Object.keys(itemNameToIcon).find(
      (key) => key.toLowerCase() === lowerItemName
    );
    if (matchingItem) {
      return (
        <span key={index}>
          <img
            src={`../icons/${itemNameToIcon[matchingItem]}`}
            alt={matchingItem}
            title={matchingItem}
            className="item-icon"
          />
        </span>
      );
    }
    return (
      <span key={index}>
        {itemName}
      </span>
    );
  });

  return itemsWithIcons;
}

export { replaceItemNamesWithIcons };
