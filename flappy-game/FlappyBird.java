import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.ArrayList;
import java.util.Random;

public class FlappyBird extends JPanel implements ActionListener, KeyListener {
    // Window dimensions
    private static final int BOARD_WIDTH = 360;
    private static final int BOARD_HEIGHT = 640;

    // UFO properties
    private int birdX = 60;
    private int birdY = BOARD_HEIGHT / 2;
    private int birdWidth = 34;
    private int birdHeight = 24;
    private double velocityY = 0;
    private double gravity = 0.50;
    private double jumpStrength = -7.0;

    // Pipe representation
    static class Pipe {
        int x;
        int y;
        int width;
        int height;
        boolean passed = false;

        Pipe(int x, int y, int width, int height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    private ArrayList<Pipe> pipes;
    private Random random = new Random();
    private int pipeWidth = 64;
    private int pipeGap = 150;
    private int pipeVelocityX = -4;

    // Game loop timers and states
    private Timer gameLoop;
    private Timer pipeSpawner;
    private boolean gameOver = false;
    private boolean started = false;
    private int score = 0;
    private int highScore = 0;

    public FlappyBird() {
        setPreferredSize(new Dimension(BOARD_WIDTH, BOARD_HEIGHT));
        setBackground(new Color(0, 0, 0)); // Sky Blue
        setFocusable(true);
        addKeyListener(this);

        pipes = new ArrayList<>();

        // Spawns a new pair of pipes every 1.5 seconds
        pipeSpawner = new Timer(1500, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (started && !gameOver) {
                    placePipes();
                }
            }
        });
        pipeSpawner.start();

        // 60 FPS Game Loop
        gameLoop = new Timer(1000 / 60, this);
        gameLoop.start();
    }

    private void placePipes() {
        int maxPipeY = BOARD_HEIGHT - 120 - pipeGap;
        int minPipeY = 40;
        int topPipeHeight = minPipeY + random.nextInt(maxPipeY - minPipeY);

        // Top pipe
        Pipe topPipe = new Pipe(BOARD_WIDTH, 0, pipeWidth, topPipeHeight);
        pipes.add(topPipe);

        // Bottom pipe
        int bottomPipeY = topPipeHeight + pipeGap;
        int bottomPipeHeight = BOARD_HEIGHT - bottomPipeY - 60; // 60px reserved for ground
        Pipe bottomPipe = new Pipe(BOARD_WIDTH, bottomPipeY, pipeWidth, bottomPipeHeight);
        pipes.add(bottomPipe);
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        draw(g);
    }

    private void draw(Graphics g) {
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // 1. Draw Pipes
        g2.setColor(new Color(46, 204, 113));
        for (Pipe p : pipes) {
            g2.fillRect(p.x, p.y, p.width, p.height);
            g2.setColor(new Color(27, 121, 67));
            g2.setStroke(new BasicStroke(3));
            g2.drawRect(p.x, p.y, p.width, p.height);
            g2.setColor(new Color(46, 204, 113));
        }

        // 2. Draw Ground
        g2.setColor(new Color(222, 216, 149));
        g2.fillRect(0, BOARD_HEIGHT - 60, BOARD_WIDTH, 60);
        g2.setColor(new Color(115, 191, 46));
        g2.fillRect(0, BOARD_HEIGHT - 60, BOARD_WIDTH, 12);

        // 3. Draw UFO
        // Glass Cockpit Dome (Cyan)
        g2.setColor(new Color(120, 230, 255));
        g2.fillArc(birdX + 7, birdY - 3, 20, 18, 0, 180);
        g2.setColor(Color.BLACK);
        g2.setStroke(new BasicStroke(2));
        g2.drawArc(birdX + 7, birdY - 3, 20, 18, 0, 180);

        // Metallic Saucer Body (Purple)
        g2.setColor(new Color(142, 68, 173));
        g2.fillOval(birdX - 2, birdY + 5, birdWidth + 4, 15);
        g2.setColor(Color.BLACK);
        g2.drawOval(birdX - 2, birdY + 5, birdWidth + 4, 15);

        // Glowing Pod Lights (Yellow)
        g2.setColor(new Color(241, 196, 15));
        g2.fillOval(birdX + 3, birdY + 10, 5, 5);
        g2.fillOval(birdX + 15, birdY + 11, 5, 5);
        g2.fillOval(birdX + 26, birdY + 10, 5, 5);

        // 4. Draw HUD / Text
        g2.setColor(Color.WHITE);
        g2.setFont(new Font("Arial", Font.BOLD, 28));

        if (!started) {
            g2.setFont(new Font("Arial", Font.BOLD, 20));
            drawCenteredString(g2, "PRESS SPACE TO START", BOARD_HEIGHT / 2);
        } else if (gameOver) {
            g2.setColor(new Color(231, 76, 60));
            drawCenteredString(g2, "GAME OVER", BOARD_HEIGHT / 2 - 40);

            g2.setColor(Color.WHITE);
            g2.setFont(new Font("Arial", Font.BOLD, 22));
            drawCenteredString(g2, "Score: " + score, BOARD_HEIGHT / 2);
            drawCenteredString(g2, "High Score: " + highScore, BOARD_HEIGHT / 2 + 35);

            g2.setFont(new Font("Arial", Font.PLAIN, 16));
            drawCenteredString(g2, "Press SPACE to Restart", BOARD_HEIGHT / 2 + 80);
        } else {
            g2.drawString(String.valueOf(score), BOARD_WIDTH / 2 - 10, 60);
        }
    }

    private void drawCenteredString(Graphics2D g2, String text, int y) {
        FontMetrics fm = g2.getFontMetrics();
        int x = (BOARD_WIDTH - fm.stringWidth(text)) / 2;
        g2.drawString(text, x, y);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (started && !gameOver) {
            move();
        }
        repaint();
    }

    private void move() {
        // Apply physics to player
        velocityY += gravity;
        birdY += (int) velocityY;

        // Ceiling collision
        if (birdY < 0) {
            birdY = 0;
            velocityY = 0;
        }

        // Floor collision
        if (birdY + birdHeight >= BOARD_HEIGHT - 60) {
            birdY = BOARD_HEIGHT - 60 - birdHeight;
            triggerGameOver();
        }

        // Move pipes & test collisions
        Rectangle birdRect = new Rectangle(birdX, birdY, birdWidth, birdHeight);

        for (int i = 0; i < pipes.size(); i++) {
            Pipe p = pipes.get(i);
            p.x += pipeVelocityX;

            // Score counter
            if (!p.passed && birdX > p.x + p.width) {
                p.passed = true;
                score++;
            }

            // Bounding box collision check
            Rectangle pipeRect = new Rectangle(p.x, p.y, p.width, p.height);
            if (birdRect.intersects(pipeRect)) {
                triggerGameOver();
            }
        }

        // Remove pipes that moved completely off-screen
        pipes.removeIf(p -> p.x + p.width < 0);
    }

    private void triggerGameOver() {
        gameOver = true;
        if (score > highScore) {
            highScore = score;
        }
    }

    private void restartGame() {
        birdY = BOARD_HEIGHT / 2;
        velocityY = 0;
        pipes.clear();
        score = 0;
        gameOver = false;
        started = true;
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_SPACE) {
            if (!started) {
                started = true;
                velocityY = jumpStrength;
            } else if (gameOver) {
                restartGame();
            } else {
                velocityY = jumpStrength;
            }
        }
    }

    @Override
    public void keyTyped(KeyEvent e) {}

    @Override
    public void keyReleased(KeyEvent e) {}

    // Program Entry Point
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Flappy Bird (Java)");
            FlappyBird game = new FlappyBird();

            frame.add(game);
            frame.pack();
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setLocationRelativeTo(null);
            frame.setResizable(false);
            frame.setVisible(true);
        });
    }
}