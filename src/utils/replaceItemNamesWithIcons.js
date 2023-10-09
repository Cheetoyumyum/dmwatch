const itemNameToIcon = {
  "dharoks set": "dharok-set.png",
  "guthans set": "guthans-set.png",
  "dharoks greataxe": "dh-axe.png",
  "dragon boots": "dragon-boots.png",
  "dragon claws": "Dragon-claws.png",
  "brimstone ring": "Brimstone-ring.png",
  "bcp" : "bandos-chestplate.png",
  "bandos chestplate" : "bandos-chestplate.png",
  "tassys" : "bandos-tassets.png",
  "vw" : "voidwaker.png",
  "ely" : "elysian-spirit-shield.png",
  "claws" : "dragon-claws.png",
  "abby whip" : "abyssal-whip.png",
  "dh set" : "dharok-set.png",
  "dds" : "dragon-dagger.png",
  "dragon dagger" : "dragon-dagger.png",
  "glory" : "amulet-of-glory.png",
  "fury" : "amulet-of-fury.png",
  "tort" : "amulet-of-torture.png",
  "prims" : "primordial-boots.png",
  "tbow" : "twisted-bow.png",
  "str ammy" : "amulet-of-strength.png",
  "primordial boots": "Primordial-boots.png",
  "elder maul": "elder-maul.png",
  "abyssal whip": "abyssal-whip.png",
  "brimstone ring" : "brimstone-ring.png",
  "dragon dagger": "dragon-dagger.png",
  "Elysian spirit shield": "elysian-spirit-shield.png",
  "ags": "armadyl-godsword.png",
  "amulet of torture": "amulet-of-torture.png",
  "amulet of strength": "amulet-of-strength.png",
  "amulet of glory": "amulet-of-glory.png",
  "amulet of fury" : "amulet-of-fury.png",
  "inquisitors set" : "inq-set.png",
  "inq set" : "inq-set.png",
  "Armadyl Godsword" : "armadyl-godsword.png",
  "armadyl gs" : "armadyl-godsword.png",
  "Ancient Godsword" : "ancient-godsword.png",
  "Voidwaker": "Voidwaker.png",
  "Fang" : "Fang.png",
  "Ghrazi Rapier" : "Ghrazi-Rapier.png",
  "3rd Age Robe Top" : "3a-robe-top.png",
  "3rd Age Robe Bottom" : "3a-robe-bottom.png",
  "Guthans set" : "Guthans-set.png",
  "Veracs Set" : "Veracs-set.png",
  "Torva Full Helm" : "Torva-helm.png",
  "Torva Platebody" : "Torva-body.png",
  "Torva Platelegs" : "Torva-legs.png",
  "Abyssal Bludgeon" : "Abyssal-bludgeon.png",
  "Inquisitors Mace" : "inq-mace.png"
};

function replaceItemNamesWithIcons(items) {
  const itemsArray = items.split(',');
  const itemsWithIcons = itemsArray.map((itemName, index) => {
    const lowerItemName = itemName.trim().toLowerCase();
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
