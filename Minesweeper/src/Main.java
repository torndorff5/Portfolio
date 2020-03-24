import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        System.out.println("Welcome to Minesweeper. Please enter size and number of mines to play with");
        Scanner input = new Scanner(System.in);
        Board b = new Board(input.nextInt(),input.nextInt());
        while(b.gameOn){
            System.out.println("Thank you. Please make your move. \"integer integer\"");
            b.makeMove(input.nextInt(),input.nextInt());
        }
        if(b.win){
            System.out.println("You win!!!!!");
        }
        else {
            System.out.println("You lose!!!!");
        }
    }
}
