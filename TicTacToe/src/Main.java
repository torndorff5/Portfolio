import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws Exception{
        /*try {
            Board tictac = new Board();
            Scanner input = new Scanner(System.in);
            while(!tictac.isBoardFull()){
                tictac.addToken(input.nextInt(),input.nextInt(),"X");
                tictac.makeMove();
                tictac.printBoard();
            }
        }catch (Exception e){
            System.err.println("Error, invalid move.");
        }*/
        Board tictac = new Board();
        for(int i = 0; i < 11; i++){
            tictac.makeMove();
            tictac.printBoard();
            System.out.println(tictac.isBoardFull());
        }

    }
}
