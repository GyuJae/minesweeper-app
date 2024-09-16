'use client';

import React, { FC } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { GameLevel } from '../../../models/game-level/game-level.enum';

interface Property {
  options: GameLevel[];
  selectedOption: GameLevel;
  onChangeLevel: (_selectedLevel: GameLevel) => void;
}

const GameLevelSelect: FC<Property> = ({ options, selectedOption, onChangeLevel }) => {
  const onValueChange = (value: string) => {
    const selectedLevel = options.find((option) => option.equals(GameLevel.valueOf(value)));
    if (selectedLevel) onChangeLevel(selectedLevel);
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={selectedOption.getName()}>
      <SelectTrigger className='w-32'>
        <SelectValue placeholder='난이도' />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.enumName} value={option.getName()} className='font-semibold'>
            {option.getName()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GameLevelSelect;
