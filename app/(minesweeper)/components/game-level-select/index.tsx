'use client';

import React, { ChangeEventHandler, FC } from 'react';

import { GameLevel } from '../../models/game-level/game-level.enum';

interface Property {
  options: GameLevel[];
  selectedOption: GameLevel;
  onChangeLevel: (_selectedLevel: GameLevel) => void;
}

const GameLevelSelect: FC<Property> = ({ options, selectedOption, onChangeLevel }) => {
  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedLevel = options.find((option) => option.equals(GameLevel.valueOf(event.target.value)));
    if (selectedLevel) onChangeLevel(selectedLevel);
  };

  return (
    <select onChange={onChange} value={selectedOption.getName()}>
      {options.map((option) => (
        <option key={option.enumName} value={option.getName()}>
          {option.getName()}
        </option>
      ))}
    </select>
  );
};

export default GameLevelSelect;
