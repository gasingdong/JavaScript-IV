/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/* eslint-disable no-undef */
/* eslint-disable no-console */
/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

class GameObject {
  constructor(attributes) {
    this.createdAt = attributes.createdAt;
    this.name = attributes.name;
    this.dimensions = attributes.dimensions;
  }

  destroy() {
    return `${this.name} was removed from the game.`;
  }
}

/*
    === CharacterStats ===
    * healthPoints
    * takeDamage() // prototype method -> returns the string '<object name> took damage.'
    * should inherit destroy() from GameObject's prototype
  */

class CharacterStats extends GameObject {
  constructor(attributes) {
    super(attributes);
    this.healthPoints = attributes.healthPoints;
  }

  takeDamage() {
    return `${this.name} took damage`;
  }
}

/*
    === Humanoid (Having an appearance or character resembling that of a human.) ===
    * team
    * weapons
    * language
    * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
    * should inherit destroy() from GameObject through CharacterStats
    * should inherit takeDamage() from CharacterStats
  */

class Humanoid extends CharacterStats {
  constructor(attributes) {
    super(attributes);
    this.team = attributes.team;
    this.weapons = attributes.weapons;
    this.language = attributes.language;
  }

  greet() {
    return `${this.name} offers a greeting in ${this.language}`;
  }
}

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: ['Staff of Shamalama'],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: ['Giant Sword', 'Shield'],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: ['Bow', 'Dagger'],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

class Character extends Humanoid {
  constructor(attributes) {
    super(attributes);
    this.ac = attributes.ac;
    this.initiative = attributes.initiative;
    this.attack = attributes.attack;
    this.damage = attributes.damage;
    this.damageDie = attributes.damageDie;
  }

  //Characters attacking a specified target
  doAttack(target) {
    //Check to see if the attack roll meets the target's AC
    if (rollDice(20, this.attack) >= target.ac) {
      //If so, we roll damage
      target.healthPoints -= rollDice(this.damageDie, this.damage);
      console.log(target.takeDamage());

      if (target.healthPoints <= 0) {
        console.log(target.destroy());
      }
    } else {
      console.log(`${this.name} misses!`);
    }
  }

  //Characters rolling initiative (turn order)
  rollInitiative() {
    return rollDice(20, this.initiative);
  }
}

//Roll dice by passing in number of sides and an optional bonus to the roll
function rollDice(numSides, bonus = 0) {
  return Math.floor(Math.random() * (numSides + 1) + bonus);
}

const hero = new Character({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 4,
  },
  healthPoints: 55,
  name: 'Jason',
  team: 'Knights of the Crucible',
  weapons: ['Sword', 'Bow'],
  language: 'Common',
  initiative: 3,
  ac: 22,
  attack: 7,
  damage: 4,
  damageDie: 12,
});

const villain = new Character({
  createdAt: new Date(),
  dimensions: {
    length: 3,
    width: 4,
    height: 6,
  },
  healthPoints: 74,
  name: 'Belphegor',
  team: 'Demon Army',
  weapons: ['Dark Claw'],
  language: 'Demonic',
  initiative: 2,
  ac: 16,
  attack: 8,
  damage: 6,
  damageDie: 8,
});

//Using closure to set up a basic turn counter function
const turnCounter = () => {
  let counter = 0;
  return () => {
    counter++;
    console.log(`Turn ${counter}`);
  };
};

//Combat logic
function doCombat(person1, person2) {
  //Compare initiative rolls and determine turn order
  let first =
    person1.rollInitiative() >= person2.rollInitiative() ? person1 : person2;
  let second = first === person1 ? person2 : person1;
  const turns = turnCounter();

  //Continue as long as both combatants have health left
  while (person1.healthPoints > 0 && person2.healthPoints > 0) {
    turns();
    first.doAttack(second);

    if (second.healthPoints > 0) {
      second.doAttack(first);
    }
  }
  return person1.healthPoints > 0
    ? `${person1.name} wins!`
    : `${person2.name} wins!`;
}

console.log(doCombat(hero, villain));
