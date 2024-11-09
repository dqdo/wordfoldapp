Project Description:
In the solitaire WordFold puzzle, a 5x5 square board has squares that initially hold a single letter. The
player manipulates the board contents by highlighting a non-empty square and then moving its contents
UP, DOWN, LEFT, or RIGHT into another non-empty square. The contents of the original highlighted square
are removed and prepended to the contents of the square in the desired direction and original square is
no longer highlighted.

![image](https://github.com/user-attachments/assets/d11dbeb9-6216-4a6f-90f0-e3f037717307)

In Board State #2, the player has selected the B square. When the player requests to move its contents
DOWN, that square is cleared and the square below it has B prepended to its contents, resulting in the
new contents, BL, as shown in Board State #3. Also note that no squares are highlighted. If the player
selects the U square and requests to move contents DOWN, that square is cleared and the square below
contains UE, as shown in Board State #4. Now the player selects the BL square and requests to move LEFT,
resulting in Board State #5. As you can see, the word BLUE has been formed. With three additional moves
(C -> CY, CY -> CYA, CYA -> CYAN), the player can create Board State #6.

![image](https://github.com/user-attachments/assets/1dba1dec-40ed-4ee7-8a97-5aa1d0f687c5)

The goal of WordFold is to move letters around, in this fashion, with the goal of creating five different
English words. For this configuration, you might be able to see that the player can form the following
words: BLUE, YELLOW, CYAN, MAUVE, PURPLE. Each word in the final solution will contain either 3, 4, 5,
or 6 letters. There are some special cases that still need to be considered: (1) The player cannot select an
empty square; (2) The player cannot move contents into an empty square; (3) No square can contain more
than SIX letters; (4) The player cannot move contents UP from the top row, LEFT from the left column,
RIGHT from the right column, or DOWN from the bottom row.

Once the player has formed FIVE words (which also means there are TWENTY empty squares), the player
can submit their solution, and the result is either a SUCCESS or FAILURE. If SUCCESS, a congratulatory
message appears; on FAILURE, an encouraging – but sad – message appears.

Scoring and Counting Moves
The score for a Board State is the sum total of the score of the squares containing 2 or more letters. If the
letters in a square appear as a substring in any word from the solution, then the score for that square is
equal to its number of letters. Board State #3 has a score of 2 since BL is a substring of the answer BLUE.
Board State #4 has a score of 4 since both BL and UE are substrings of the answer BLUE. If, from Board
State #4, the player selects the UE square and requests to move RIGHT, then Board State #7 is formed.
Since UEBL is not a substring of a word from the solution, the overall score for that Board State is 0.

![image](https://github.com/user-attachments/assets/f3e18bcd-8987-4b1b-8c7a-667f95eb7332)

Until the puzzle is solved, WordFold records the move count and displays it during game play. Once the
player has checked the solution, no more moves are allowed. When a player resets a puzzle to its initial
state, the number of moves is reset to 0, and the board is returned to its initial configuration.
Note: Because of poor letter management, it may be the case that the player is unable to make any moves
because there remain no two adjacent non-empty squares. It is not your responsibility to detect these
situations. Should this happen, the player can reset the game to its initial configuration and try again.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
