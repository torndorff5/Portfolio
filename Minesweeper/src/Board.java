import java.util.Random;


public class Board {
    boolean[][] board;
    int[][] gameBoard;
    String[][] displayBoard;
    int size;
    int num_mines;
    int exposed_tiles;
    boolean gameOn;
    boolean win;
    Board(int size,int num_mines) {
        this.gameOn = true;
        this.size = size;
        this.num_mines = num_mines;
        exposed_tiles = 0;
        win = false;
        setBoard();
        setGameBoard();
        setDisplayBoard();
    }

    void setBoard() {
        board = new boolean[size][size];
        for (int i = 0; i < board.length; i++) {//set whole board to false
            for(int j = 0; j < board.length; j++){
                board[i][j] = false;
            }
        }
        Random rand = new Random();
        for (int i = 0; i < num_mines; i++){//create all the mines
            //generate two random numbers under size

            int x = rand.nextInt(size);
            int y = rand.nextInt(size);
            //check if mine is there
            if(!board[x][y]) {
                //if not there place mine
                board[x][y] = true;
            }
        }

    }
    void setGameBoard(){
        //go through each spot and count the adjacent mines up and place in spot
        gameBoard = new int[size][size];
        for (int i = 0; i < board.length; i++) {//set whole board to false
            for(int j = 0; j < board.length; j++){
                int count = 0;
                if(board[i][j]){
                    gameBoard[i][j] = -1;
                }
                else {
                    if(i - 1 >= 0) {
                        //check up
                        if(board[i-1][j]){
                            count++;
                        }
                    }
                    if(i - 1 >= 0 && j - 1 >= 0){
                        //check up and to the left
                        if(board[i-1][j-1]){
                            count++;
                        }
                    }
                    if(j - 1 >= 0){
                        //check to the left
                        if(board[i][j-1]){
                            count++;
                        }
                    }
                    if(j-1 >= 0 && i + 1 <= size - 1 ){
                        //check to the left and down
                        if(board[i+1][j-1]){
                            count++;
                        }
                    }
                    if(i + 1 <= size - 1){
                        //check down
                        if(board[i+1][j]){
                            count++;
                        }
                    }
                    if(i + 1 <= size -1 && j + 1 <= size - 1){
                        //check down and to the right
                        if(board[i+1][j+1]){
                            count++;
                        }
                    }
                    if(j + 1 <= size - 1 ){
                        //check right
                        if(board[i][j+1]){
                            count++;
                        }
                    }
                    if(j + 1 <= size - 1 && i - 1 >= 0){
                        //check up and to the right
                        if(board[i-1][j+1]){
                            count++;
                        }
                    }
                    gameBoard[i][j] = count;
                }
            }
        }
        //printBoard(gameBoard);
    }
    void setDisplayBoard(){
        displayBoard = new String[size][size];
        for (int i = 0; i < displayBoard.length; i++) {//set whole board to false
            for(int j = 0; j < displayBoard.length; j++){
                displayBoard[i][j] = "X";
            }
        }
        printBoard(displayBoard);
    }

    void makeMove(int i, int j){
        //if its a zero then expose all surrounding
        if(gameBoard[i][j] == 0){
            displayBoard[i][j] = "0";
            exposed_tiles++;
            exposeSurroundings(i,j);
        }
        else if(gameBoard[i][j] == -1){//if its a -1, then game over
            displayBoard[i][j] = "-1";
            exposed_tiles++;
            gameOn = false;
        }
        else { //if its a number other than -1 expose it
            displayBoard[i][j] = Integer.toString(gameBoard[i][j]);
            exposed_tiles++;
        }
        //if count of exposed tiles equals total tiles - # of mines then its a win
        if(exposed_tiles == (size*size-num_mines)){
            //this is a win.
            gameOn = false;
            win = true;
        }
        printBoard(displayBoard);
    }

    void exposeSurroundings(int i, int j){
        if(i - 1 >= 0) {
            //check up
            displayBoard[i-1][j] = Integer.toString(gameBoard[i-1][j]);
            exposed_tiles++;
        }
        if(i - 1 >= 0 && j - 1 >= 0){
            //check up and to the left
            displayBoard[i-1][j-1] = Integer.toString(gameBoard[i-1][j-1]);
            exposed_tiles++;
        }
        if(j - 1 >= 0){
            //check to the left
            displayBoard[i][j-1] = Integer.toString(gameBoard[i][j-1]);
            exposed_tiles++;
        }
        if(j-1 >= 0 && i + 1 <= size - 1 ){
            //check to the left and down
            displayBoard[i+1][j-1] = Integer.toString(gameBoard[i+1][j-1]);
            exposed_tiles++;
        }
        if(i + 1 <= size - 1){
            //check down
            displayBoard[i+1][j] = Integer.toString(gameBoard[i+1][j]);
            exposed_tiles++;
        }
        if(i + 1 <= size -1 && j + 1 <= size - 1){
            //check down and to the right
            displayBoard[i+1][j+1] = Integer.toString(gameBoard[i+1][j+1]);
            exposed_tiles++;
        }
        if(j + 1 <= size - 1 ){
            //check right
            displayBoard[i][j+1] = Integer.toString(gameBoard[i][j+1]);
            exposed_tiles++;
        }
        if(j + 1 <= size - 1 && i - 1 >= 0){
            //check up and to the right
            displayBoard[i-1][j+1] = Integer.toString(gameBoard[i-1][j+1]);
            exposed_tiles++;
        }
    }

    void printBoard(String[][] b){
        System.out.print("  ");
        for(int i = 0; i < b.length; i++){
            System.out.print(i + " ");
        }
        System.out.println();
        for (int i = 0; i < b.length; i++) {//set whole board to false
            System.out.print(i + " ");
            for(int j = 0; j < b.length; j++){
                System.out.print(b[i][j] + " ");
            }
            System.out.println();
        }

    }
    void printBoard(int[][] b){
        for (int i = 0; i < b.length; i++) {//set whole board to false
            for(int j = 0; j < b.length; j++){
                System.out.print(b[i][j] + " ");
            }
            System.out.println();
        }

    }
}
