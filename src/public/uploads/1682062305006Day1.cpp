#include <iostream>
#include <string>

using namespace std;

typedef struct player
{
    string name;
    float cao;
    float nang;
    player(string name, float cao, float nang){
        this->name = name;
        this->cao = cao;
        this->nang = nang;
    }
    float getBMI()
    {
        return nang / (cao * cao);
    }
} player;

int main()
{
    /*
        // 1. CHƯƠNG TRÌNH CƠ BẢN

        std::cout << "hello world!\n";
        std::cout << "Phenikaa Uni!\n";
        std::cout << std::endl; // == \n
                                // clear buffer, dùng để in ra luôn thứ cần in
                                // \n chương trình chạy nhanh hơn, nhưng muốn in ra luôn kết quả thì nên dùng << std::endl;
        std::cout << "nhap 2 so\n";
        int a, b;
        std::cin >> a >> b;
        std::cout << "the sum of " << a << " and " << b << " is :" << a + b << std::endl;
        return 0;

        // 2. TÍNH THỂ TÍCH HÌNH TRỤ

        float r, h, pi = 3.14;
        std::cout << "nhap ban kinh : " << std::endl;
        std::cin >> r;
        std::cout << "nhap chieu cao: " << std::endl;
        std::cin >> h;
        std::cout << "hinh tru co r = " << r << "m, h = " << h << "m, co V = " << pi * r * r * h << "m^3" << std::endl;
        return 0;

        // ===========================================================================================================================

        // SAU KHI THÊM using namespace std;

        // ===========================================================================================================================

        cout << "helloooooooooo" << endl
             << endl;

        // 3. NHẬP X, IN RA BẢNG CỬU CHƯƠNG CỦA X

        int x, i;
        cout << "nhap x = " << endl;
        cin >> x;
        cout << "bang cuu chuong " << x << endl;

        for (i = 1; i <= 10; i++)
        {
            cout << x << " * " << i << " = " << x * i << endl;
        }
        return 0;


    // 4. NHẬP X, N. IN RA BẢNG NHÂN X VỚI N SỐ NGUYÊN TỐ ĐẦU TIÊN

    
        int x, n, i, j;
        int dem = 0;
        cout << "nhap x = " << endl;
        cin >> x;
        cout << "nhap n = " << endl;
        cin >> n;
        cout << endl
             << "ket qua:" << endl
             << endl;
        for (i = 2;; i++)
        {
            int demuoc = 0;
            for (j = 1; j <= i; j++)
            {
                if (i % j == 0)
                {
                    demuoc++;
                }
            }
            if (demuoc == 2)
            {
                cout << x << " * " << i << " = " << x * i << endl;
                dem++;
            }
            if (dem == n)
            {
                break;
            }
        }
        return 0;

    
        // 5. TÍNH TỔNG CÁC SỐ CỦA DÃY NHẬP VÀO

        int sum = 0, varlue = 0;
        cout << "nhap so: (nhap chu de dung)" << endl;
        while (cin >> varlue)
        {
            sum += varlue;
        }
        cout << "sum is: " << sum << endl;
        return 0;
*/
    // 6. CẤU TRÚC STRUCT
    
    player p("taka", 1.8, 77);
    cout << p.getBMI() << endl;
    
    // 6. DANH SÁCH LIÊN KẾT....
}
