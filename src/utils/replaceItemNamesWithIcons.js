const itemNameToIcon = {
  'dharok armour set': 'dharok-set.png',
  'guthans armour set': 'guthans-set.png',
  'dharoks greataxe': 'dharok-greataxe.png',
  'dragon claws': 'Dragon_claws.png',
  'brimstone ring': 'Brimstone_ring.png',
  'primordial boots': 'Primordial-boots.png',
  'elder maul': 'elder-maul.png',
  'abyssal whip': 'abyssal-whip.png',
  'dragon dagger' : 'dragon-dagger.png',
  'ags' : 'armadyl-god-sword.png'
};

function replaceItemNamesWithIcons(items) {
  const itemsArray = items.split(', ');
  const itemsWithIcons = itemsArray.map((itemName, index) => {
    const lowerItemName = itemName.toLowerCase();
    if (itemNameToIcon[lowerItemName]) {
      return (
        <span key={index}>
          <img
            src={`../icons/${itemNameToIcon[lowerItemName]}`}
            alt={itemName}
            title={itemName}
            className="item-icon"
          />
          {index < itemsArray.length - 1 && ', '}
        </span>
      );
    }
    return (
      <span key={index}>
        {itemName}
        {index < itemsArray.length - 1 && ', '}
      </span>
    );
  });
  return itemsWithIcons;
}

export { replaceItemNamesWithIcons };
