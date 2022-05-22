using NUnit.Framework;
using Moq;
using ObserverSubscribers;
using System.Collections.Generic;

namespace TestProject3
{
    public class Tests
    {

        [Test]
        public void Test1()
        {

            var Publisher = new Publisher();
            var client1 = new Subscriber1(3000, "������");
            Publisher.Attach(client1);

            var client2 = new Subscriber2(1700, "������");
            Publisher.Attach(client2);

            List<string> newProducts = new List<string>();

            newProducts.Add("���� Bushido");

            Publisher.AddSomeProducts(newProducts);

            Assert.IsTrue(client2.boughtItems.Contains("���� Bushido"));

            newProducts.Add("����� �.�. �����������");
            Publisher.AddSomeProducts(newProducts);

            Assert.IsTrue(client1.boughtItems.Contains("����� �.�. �����������"));
        }
    }
}