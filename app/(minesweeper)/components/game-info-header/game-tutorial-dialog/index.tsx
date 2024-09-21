import { QuestionMarkIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const GameTutorialDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon' className='size-10 rounded-full'>
          <QuestionMarkIcon className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>지뢰찾기 게임방법</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div>
            <h3>1. 셀 열기</h3>
            <DialogDescription>
              마우스 <strong className='text-white'>왼쪽 버튼</strong>을 클릭하여 셀을 엽니다. 지뢰를 클릭하면 게임이
              종료됩니다.
            </DialogDescription>
          </div>
          <div>
            <h3>2. 깃발 꽂기</h3>
            <DialogDescription>
              마우스 <strong className='text-white'>오른쪽 버튼</strong>을 클릭하여 지뢰가 있을 것 같은 셀에 깃발을
              꽂습니다. 깃발이 꽂힌 셀은 클릭할 수 없습니다.
            </DialogDescription>
          </div>
          <div>
            <h3>3. 승리 조건</h3>
            <DialogDescription>모든 지뢰가 아닌 셀을 열면 게임에서 승리합니다.</DialogDescription>
          </div>
          <div>
            <h3>4. 추가 팁</h3>
            <DialogDescription>숫자는 해당 셀 주변에 있는 지뢰의 수를 나타냅니다.</DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameTutorialDialog;
