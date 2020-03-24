public class Board {
    String board[][];
    final int size = 3;
    Board(){
        setBoard();
        printBoard();
    }
    void setBoard(){
        board = new String[size][size];
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board.length; j++){
                board[i][j] = "-";
            }
        }
    }
    void printBoard(){
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board.length; j++){
                System.out.print(board[i][j]);
                if(j < 2){
                    System.out.print(" | ");
                }
            }
            System.out.println();
        }
    }
    void addToken(int i, int j, String t){
        if((i >= 0 && i < size) && (j >= 0 && j < size)){//check for in bounds
            //check to see if token in place
            if(board[i][j].equals("-")){
                //place token on board
                board[i][j] = t;
            }
        }
    }
    boolean isBoardFull(){
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board.length; j++){
                    if(board[i][j].equals("-")){
                        return false;
                }
            }
        }
        return true;
    }
    void makeMove() throws Exception{
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board.length; j++){
                if(board[i][j].equals("-")){
                    board[i][j] = "O";
                    return;
                }
            }
        }
        throw new Exception();
    }
}
