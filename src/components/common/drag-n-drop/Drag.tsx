import React, { DragEvent, useState } from 'react';
import classes from './Drag.module.scss';

export const Drag: React.FC = React.memo(() => {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: 'Users',
            items: [
                { id: 1, name: 'Maxim' },
                { id: 2, name: 'Pavel' },
                { id: 3, name: 'Olga' },
                { id: 4, name: 'Karina' },
            ],
        },
        {
            id: 2,
            title: 'Mentors',
            items: [
                { id: 1, name: 'Uzik' },
                { id: 2, name: 'Tadik' },
            ],
        },
    ]);

    const [currentBoard, setCurrentBoard] = useState<any>(null);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {};

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, board: any, item: any) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {};

    const dropHandler = (e: DragEvent<HTMLDivElement>, board: any, item: any) => {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);

        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);

        setBoards(
            boards.map(b => {
                if (b.id === board.id) {
                    return board;
                }

                if (b.id === currentBoard.id) {
                    return currentBoard;
                }

                return b;
            }),
        );
    };

    const dropBoardHandler = (e: DragEvent<HTMLDivElement>, board: any) => {
        board.items.push(currentItem);
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);

        setBoards(
            boards.map(b => {
                if (b.id === board.id) {
                    return board;
                }

                if (b.id === currentBoard.id) {
                    return currentBoard;
                }

                return b;
            }),
        );
    };

    return (
        <div className={classes.drag}>
            {boards.map(board => (
                <div
                    className={classes.board}
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => dropBoardHandler(e, board)}
                >
                    {board.title}
                    <div>
                        {board.items.map(item => (
                            <div
                                id="item"
                                className={classes.name}
                                draggable
                                onDragOver={e => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={e => dragStartHandler(e, board, item)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDrop={e => dropHandler(e, board, item)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});
